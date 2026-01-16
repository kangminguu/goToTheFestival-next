/**
 * sync.js - Festival data synchronization script
 * CommonJS 방식으로 작성 (환경변수 호환성↑, 파일도 간단)
 * 실행: node scripts/sync.js
 * 환경변수 설정(CMD):
 *   set SUPABASE_URL=https://xxxxx.supabase.co
 *   set SUPABASE_SERVICE_ROLE_KEY=xxxxx
 *   set TOUR_API_BASE_URL=https://apis.data.go.kr/...
 *   set TOUR_API_KEY=xxxxx
 */

require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// 환경변수 로드
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TOUR_API_BASE_URL = process.env.TOUR_API_BASE_URL || process.env.TourAPI_BASE_URL;
const TOUR_API_KEY = process.env.TOUR_API_KEY || process.env.TourAPI_KEY;

console.log('Checking env vars...');
console.log('SUPABASE_URL:', SUPABASE_URL ? '✓' : '✗');
console.log('SUPABASE_KEY:', SUPABASE_KEY ? '✓' : '✗');
console.log('TOUR_API_BASE_URL:', TOUR_API_BASE_URL ? '✓' : '✗');
console.log('TOUR_API_KEY:', TOUR_API_KEY ? '✓' : '✗');

if (!SUPABASE_URL || !SUPABASE_KEY || !TOUR_API_BASE_URL || !TOUR_API_KEY) {
    console.error('\n❌ Missing env vars!');
    console.error('Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, TOUR_API_BASE_URL, TOUR_API_KEY');
    console.error('Make sure .env.local has these variables or set them manually.');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * 외부 API에서 축제 목록 한 페이지 조회
 */
async function fetchFestivalPage(page = 1, numOfRows = 1000) {
    // 날짜 범위: 지금부터 앞으로 2년
    const today = new Date();
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 2);

    const eventStartDate = today.toISOString().slice(0, 10).replace(/-/g, '');
    const eventEndDate = futureDate.toISOString().slice(0, 10).replace(/-/g, '');

    const url = new URL('searchFestival2', TOUR_API_BASE_URL);
    url.searchParams.set('serviceKey', decodeURIComponent(TOUR_API_KEY));
    url.searchParams.set('MobileOS', 'ETC');
    url.searchParams.set('MobileApp', 'App');
    url.searchParams.set('_type', 'json');
    url.searchParams.set('pageNo', String(page));
    url.searchParams.set('numOfRows', String(numOfRows));
    url.searchParams.set('eventStartDate', eventStartDate);
    url.searchParams.set('eventEndDate', eventEndDate);
    const res = await fetch(url.toString());
    const json = await res.json();

    console.log(`API Response Status: ${res.status}`);
    console.log(`API Response:`, JSON.stringify(json, null, 2));

    if (json?.response?.body?.items?.item) {
        const items = json.response.body.items.item;
        console.log(`Found ${Array.isArray(items) ? items.length : 1} items`);
        return Array.isArray(items) ? items : [items];
    }

    console.log('No items found in API response');
    return [];
}

/**
 * DB에서 현재 저장된 contentid → api_modifiedtime 맵 조회
 */
async function getExistingModifiedMap() {
    const { data, error } = await supabase
        .from('festivals')
        .select('contentid, api_modifiedtime');

    if (error) {
        console.error('Error querying festivals:', error);
        return {};
    }

    const map = {};
    (data || []).forEach(row => {
        map[row.contentid] = row.api_modifiedtime || null;
    });
    return map;
}

/**
 * 축제 기본 정보 upsert (images/contents는 제외)
 */
async function upsertFestival(item) {
    const row = {
        contentid: item.contentid,
        title: item.title,
        addr1: item.addr1 || null,
        addr2: item.addr2 || null,
        areacode: item.areacode || null,
        mapx: item.mapx ? parseFloat(item.mapx) : null,
        mapy: item.mapy ? parseFloat(item.mapy) : null,
        event_start: item.eventstartdate ? formatYYYYMMDDToDate(item.eventstartdate) : null,
        event_end: item.eventenddate ? formatYYYYMMDDToDate(item.eventenddate) : null,
        first_image: item.firstimage || null,
        first_image2: item.firstimage2 || null,
        raw: item,
        api_modifiedtime: item.modifiedtime || item.modifiedTime || null,
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
        .from('festivals')
        .upsert(row, { onConflict: 'contentid' });

    if (error) {
        console.error(`Upsert error for ${item.contentid}:`, error);
        throw error;
    }
}

/**
 * YYYYMMDD 형식을 Date 형식으로 변환
 */
function formatYYYYMMDDToDate(dateStr) {
    if (!dateStr || dateStr.length !== 8) return null;
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${year}-${month}-${day}`;
}

/**
 * 메인 동기화 함수
 */
async function run() {
    console.log('\n🚀 Start Festival Sync\n');

    try {
        const existing = await getExistingModifiedMap();
        console.log(`Found ${Object.keys(existing).length} existing festivals in DB\n`);

        let page = 1;
        let updated = 0;
        let skipped = 0;
        const pageSize = 100; // 작은 페이지 크기로 테스트 (나중에 1000으로 변경 가능)

        while (true) {
            const list = await fetchFestivalPage(page, pageSize);
            if (!list || list.length === 0) {
                console.log('No more data from API.');
                break;
            }

            console.log(`Processing ${list.length} items from page ${page}...`);

            for (const item of list) {
                const apiModified = item.modifiedtime || item.modifiedTime || null;
                const existingModified = existing[item.contentid];

                // 신규 또는 변경된 항목만 업서트
                if (!existingModified || existingModified !== apiModified) {
                    await upsertFestival(item);
                    updated++;
                } else {
                    skipped++;
                }
            }

            if (list.length < pageSize) {
                console.log('Reached last page.');
                break;
            }

            page++;
        }

        console.log(`\n✅ Sync finished!`);
        console.log(`Updated: ${updated}, Skipped: ${skipped}`);
    } catch (err) {
        console.error('\n❌ Error during sync:', err);
        process.exit(1);
    }
}

// 실행
run();

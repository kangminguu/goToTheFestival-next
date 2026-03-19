/**
 * sync.js - Festival data synchronization script
 * 실행: node --env-file-if-exists=.env.local scripts/sync.js
 */

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
async function fetchFestivalPage(pageNo = 1) {
    const url = new URL('searchFestival2', TOUR_API_BASE_URL);
    url.searchParams.set('serviceKey', decodeURIComponent(TOUR_API_KEY));
    url.searchParams.set('MobileOS', 'ETC');
    url.searchParams.set('MobileApp', 'App');
    url.searchParams.set('_type', 'json');
    url.searchParams.set('pageNo', pageNo.toString());
    url.searchParams.set('numOfRows', "100");
    url.searchParams.set('eventStartDate', "20000101");

    const res = await fetch(url.toString());
    const json = await res.json();

    if (json?.response?.body?.items?.item) {
        const items = json.response.body.items.item;
        const totalCount = parseInt(json.response.body.totalCount) || 0;
        return {
            items: Array.isArray(items) ? items : [items],
            totalCount,
            pageNo
        };
    }

    return { items: [], totalCount: 0, pageNo };
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
        areacode: item.areacode || inferAreaCode(item.addr1) || null,
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
 * addr1에서 지역명 추출하여 areacode 반환
 */
function inferAreaCode(addr1) {
    if (!addr1) return null;
    if (addr1.includes("서울")) return "1";
    if (addr1.includes("인천")) return "2";
    if (addr1.includes("대전")) return "3";
    if (addr1.includes("대구")) return "4";
    if (addr1.includes("광주")) return "5";
    if (addr1.includes("부산")) return "6";
    if (addr1.includes("울산")) return "7";
    if (addr1.includes("세종")) return "8";
    if (addr1.includes("경기")) return "31";
    if (addr1.includes("강원")) return "32";
    if (addr1.includes("충북") || addr1.includes("충청북")) return "33";
    if (addr1.includes("충남") || addr1.includes("충청남")) return "34";
    if (addr1.includes("경북") || addr1.includes("경상북")) return "35";
    if (addr1.includes("경남") || addr1.includes("경상남")) return "36";
    if (addr1.includes("전북") || addr1.includes("전라북")) return "37";
    if (addr1.includes("전남") || addr1.includes("전라남")) return "38";
    if (addr1.includes("제주")) return "39";
    return null;
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

        let updated = 0;
        let skipped = 0;
        let pageNo = 1;
        let totalCount = 0;
        let processedCount = 0;

        while (true) {
            console.log(`📄 Fetching page ${pageNo}...`);
            const { items, totalCount: total } = await fetchFestivalPage(pageNo);

            if (total > 0 && totalCount === 0) {
                totalCount = total;
                console.log(`Total festivals from API: ${totalCount}`);
            }

            if (!items || items.length === 0) {
                console.log('No more data from API.');
                break;
            }

            console.log(`  ↳ Got ${items.length} items on this page`);

            for (const item of items) {
                const apiModified = item.modifiedtime || item.modifiedTime || null;
                const existingModified = existing[item.contentid];

                if (!existingModified || existingModified !== apiModified) {
                    // if (true) { // for testing
                    await upsertFestival(item);
                    updated++;
                } else {
                    skipped++;
                }
                processedCount++;
            }

            // 다음 페이지로
            pageNo++;
            console.log(`  Progress: ${processedCount}/${totalCount || '?'}\n`);
        }

        console.log(`\n✅ Sync finished!`);
        console.log(`Updated: ${updated}, Skipped: ${skipped}`);
        console.log(`Total processed: ${processedCount}`);
    } catch (err) {
        console.error('\n❌ Error during sync:', err);
        process.exit(1);
    }
}

// 실행
run();

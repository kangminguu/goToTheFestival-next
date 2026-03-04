import { createClient } from "../../utils/server";

// 축제 리스트를 DB에서 가져오는 함수
export async function getFestivalListFromDB(options: {
    sortBy?: "date" | "distance" | "review_count";
    userLat?: number;
    userLng?: number;
    limit?: number;
    offset?: number;
    regionCode?: string;
    eventStartDate?: string;
    eventEndDate?: string;
    keyword?: string;
    contentIds?: string[];
}) {
    const supabase = await createClient();

    // distance 정렬 시 RPC 함수 사용
    if (options.sortBy === "distance" && options.userLat && options.userLng) {
        const { data, error } = await supabase.rpc(
            "get_festivals_by_distance",
            {
                user_lat: options.userLat,
                user_lng: options.userLng,
                start_date: options.eventStartDate || "2010-01-01",
                end_date: options.eventEndDate || "2050-12-31",
                region: options.regionCode || "",
                search_keyword: options.keyword || "",
                limit_count: options.limit || 12,
                offset_count: options.offset || 0,
            },
        );

        if (error) {
            console.error("RPC 조회 실패:", error);
            return null;
        }

        return data;
    }

    let query = supabase
        .from("festivals")
        .select(
            "contentid, title, addr1, first_image, event_start, event_end, review_count, avg_rating",
        )
        .eq("deleted", false);

    // contentIds 필터
    if (options.contentIds) {
        if (options.contentIds.length === 0) return [];
        query = query.in("contentid", options.contentIds);
    }

    // 필터링
    if (options.regionCode && options.regionCode !== "0") {
        query = query.eq("areacode", options.regionCode);
    }
    if (options.eventStartDate && options.eventEndDate) {
        query = query
            .gte("event_end", options.eventStartDate)
            .lte("event_start", options.eventEndDate);
    }
    if (options.keyword) {
        query = query.ilike("title", `%${options.keyword}%`);
    }

    // 정렬
    if (options.sortBy === "date") {
        query = query.order("event_start", { ascending: true });
    } else if (options.sortBy === "review_count") {
        query = query.order("review_count", { ascending: false });
    }

    // 페이징
    if (options.limit) query = query.limit(options.limit);
    if (options.offset !== undefined) {
        query = query.range(
            options.offset,
            options.offset + (options.limit || 12) - 1,
        );
    }

    const { data, error } = await query;

    if (error) {
        console.error("DB 조회 실패:", error);
        return null;
    }

    return data;
}

// 배너용 축제 리스트를 DB에서 가져오는 함수
export async function getBannerFestivalListFromDB(options: {
    month: number;
    limit: number;
}) {
    const supabase = await createClient();

    // 현재 날짜 기준
    const now = new Date();
    // 해당 월의 시작일, 종료일
    const year = now.getFullYear();
    const monthStart = new Date(year, options.month - 1, 1);
    const monthEnd = new Date(year, options.month, 0); // 월의 마지막 날

    let query = supabase
        .from("festivals")
        .select("contentid, title, addr1, first_image, event_start, event_end") // 축제 id, 제목, 주소, 대표이미지, 시작일, 종료일
        .eq("deleted", false)
        .gte("event_start", monthStart.toISOString().split("T")[0])
        .lte("event_start", monthEnd.toISOString().split("T")[0])
        // .gte("event_end", now.toISOString().split("T")[0])
        .not("first_image", "is", null)
        .not("first_image", "eq", "");

    if (options.limit) query = query.limit(options.limit);

    const { data, error } = await query;

    if (error) {
        console.error("DB 조회 실패:", error);
        return null;
    }

    return data;
}

import { createClient } from "../../utils/server";

// 축제 리스트를 DB에서 가져오는 함수
export async function getFestivalListFromDB(options: {
    sortBy?: "date" | "distance" | "review_count";
    limit?: number;
    offset?: number;
}) {
    const supabase = await createClient();

    let query = supabase
        .from("festivals")
        .select(
            "contentid, title, addr1, first_image, event_start, event_end, review_count, avg_rating"
        )
        .eq("deleted", false);

    // 정렬 방식에 따라 다르게 처리
    if (options.sortBy === "date") {
        query = query.order("event_start", { ascending: true });
    } else if (options.sortBy === "review_count") {
        query = query.order("review_count", { ascending: false });
    }

    // 페이징
    if (options.limit) {
        query = query.limit(options.limit);
    }
    if (options.offset) {
        query = query.range(
            options.offset,
            options.offset + (options.limit || 12) - 1
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
        // 이번 달에 시작하는 축제 중, 아직 종료되지 않은 축제
        .gte("event_start", monthStart.toISOString().split("T")[0])
        .lte("event_start", monthEnd.toISOString().split("T")[0])
        .gte("event_end", now.toISOString().split("T")[0])
        // 이미지 필수 (null/빈 문자열 제외)
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

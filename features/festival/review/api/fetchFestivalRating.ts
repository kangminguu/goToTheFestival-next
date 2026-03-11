import { FestivalRatingsResponse } from "../model/types";

export async function fetchFestivalRating(
    contentId: string,
): Promise<FestivalRatingsResponse> {
    const response = await fetch(`/api/festival/${contentId}/ratings`, {
        method: "GET",
    });

    if (!response.ok) {
        const body = await response.json();
        const message =
            body?.error ||
            `축제 후기 평균 점수, 후기 개수 조회 실패 (${response.status})`;
        throw new Error(message);
    }

    return response.json();
}

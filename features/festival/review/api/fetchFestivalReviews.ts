import type { FestivalReviewsResponse } from "../model/types";

export async function fetchFestivalReviews(
    contentId: string,
): Promise<FestivalReviewsResponse> {
    const response = await fetch(`/api/festival/${contentId}/reviews`, {
        method: "GET",
    });

    if (!response.ok) {
        const body = await response.json();
        const message =
            body?.error || `축제 후기 조회 실패 (${response.status})`;
        throw new Error(message);
    }

    return response.json();
}

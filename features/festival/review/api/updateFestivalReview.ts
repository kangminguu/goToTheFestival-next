export async function updateFestivalReview(params: {
    contentId: string;
    reviewId: string;
    rating: number;
    content: string;
}) {
    const res = await fetch(
        `/api/festival/${params.contentId}/reviews/${params.reviewId}`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                rating: params.rating,
                content: params.content,
            }),
        },
    );

    const body = await res.json();

    return { ok: res.ok, status: res.status, body };
}

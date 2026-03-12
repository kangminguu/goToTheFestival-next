export async function deleteFestivalReview(params: {
    contentId: string;
    reviewId: string;
}) {
    const res = await fetch(
        `/api/festival/${params.contentId}/reviews/${params.reviewId}`,
        {
            method: "DELETE",
        },
    );

    const body = await res.json();

    return { ok: res.ok, status: res.status, body };
}

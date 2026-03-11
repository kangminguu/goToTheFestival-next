export async function createFestivalReview(params: {
    contentId: string;
    rating: number;
    content: string;
}) {
    const res = await fetch(`/api/festival/${params.contentId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            rating: params.rating,
            content: params.content,
        }),
    });

    const body = await res.json();

    return { ok: res.ok, status: res.status, body };
}

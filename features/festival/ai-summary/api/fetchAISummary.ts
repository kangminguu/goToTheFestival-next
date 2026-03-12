import { AISummary, AISummaryRequestFestivalInfo } from "../model/types";

export async function fetchAISummary(
    contentId: string,
    festivalInfo: AISummaryRequestFestivalInfo,
): Promise<AISummary> {
    const response = await fetch(`/api/festival/${contentId}/ai-summary`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ contentId, festivalInfo }),
    });

    if (!response.ok) {
        const body = await response.json();
        const message = body?.error || `AI 요약 조회 실패 (${response.status})`;
        throw new Error(message);
    }

    return response.json();
}

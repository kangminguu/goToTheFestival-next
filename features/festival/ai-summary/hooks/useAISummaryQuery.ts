import { useQuery } from "@tanstack/react-query";
import { AISummaryRequestFestivalInfo } from "../model/types";
import { fetchAISummary } from "../api/fetchAISummary";

export function useAISummaryQuery(
    contentId: string,
    festivalInfo: AISummaryRequestFestivalInfo,
) {
    return useQuery({
        queryKey: ["festival", contentId, "ai-summary"],
        queryFn: () => fetchAISummary(contentId, festivalInfo),
        enabled: !!contentId && !!festivalInfo?.title,
    });
}

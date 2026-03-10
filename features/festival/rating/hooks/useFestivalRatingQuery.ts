import { useQuery } from "@tanstack/react-query";
import { fetchFestivalRating } from "../api/fetchFestivalRating";

export function useFestivalRatingQuery(contentId: string) {
    return useQuery({
        queryKey: ["festival", contentId, "ratings"],
        queryFn: () => fetchFestivalRating(contentId),
        enabled: !!contentId,
    });
}

import { useQuery } from "@tanstack/react-query";
import { fetchFestivalReviews } from "../api/fetchFestivalReviews";

export function useFestivalReviewsQuery(contentId: string) {
    return useQuery({
        queryKey: ["festival", contentId, "reviews"],
        queryFn: () => fetchFestivalReviews(contentId),
        enabled: !!contentId,
    });
}

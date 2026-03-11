import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFestivalReview } from "../api/createFestivalReview";

export function useCreateFestivalReview(contentId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { rating: number; content: string }) =>
            createFestivalReview({ contentId, ...payload }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["festival", contentId, "reviews"],
            });
            queryClient.invalidateQueries({
                queryKey: ["festival", contentId, "ratings"],
            });
        },
    });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFestivalReview } from "../api/deleteFestivalReview";

export function useDeleteFestivalReview(contentId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { reviewId: string }) =>
            deleteFestivalReview({ contentId, ...payload }),
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

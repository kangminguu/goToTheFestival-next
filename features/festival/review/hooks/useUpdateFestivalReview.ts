import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFestivalReview } from "../api/updateFestivalReview";

export function useUpdateFestivalReview(contentId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: {
            reviewId: string;
            rating: number;
            content: string;
        }) => updateFestivalReview({ contentId, ...payload }),
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

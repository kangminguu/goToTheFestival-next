import { create } from "zustand";

type WriteReviewModalStore = {
    isOpen: boolean;
    title: string;
    contentId: string;
    onSubmitReview: (rating: number, content: string) => void;
    open: (
        title: string,
        contentId: string,
        onClick: (rating: number, content: string) => void
    ) => void;
    close: () => void;
};

export const useWriteReviewModalStore = create<WriteReviewModalStore>(
    (set) => ({
        isOpen: false,
        title: "",
        contentId: "",
        onSubmitReview: () => {},
        open: (title, contentId, onSubmitReview) =>
            set({
                isOpen: true,
                contentId,
                title,
                onSubmitReview,
            }),
        close: () => set({ isOpen: false }),
    })
);

import { create } from "zustand";

type WriteReviewModalStore = {
    isOpen: boolean;
    title: string;
    contentId: string;
    initialRating?: number;
    initialContent?: string;
    onSubmitReview: (rating: number, content: string) => void;
    open: (
        title: string,
        contentId: string,
        onClick: (rating: number, content: string) => void,
        initialRating?: number,
        initialContent?: string
    ) => void;
    close: () => void;
};

export const useWriteReviewModalStore = create<WriteReviewModalStore>(
    (set) => ({
        isOpen: false,
        title: "",
        contentId: "",
        initialRating: 0,
        initialContent: "",
        onSubmitReview: () => {},
        open: (
            title,
            contentId,
            onSubmitReview,
            initialRating = 0,
            initialContent = ""
        ) =>
            set({
                isOpen: true,
                contentId,
                title,
                onSubmitReview,
                initialRating,
                initialContent,
            }),
        close: () => set({ isOpen: false }),
    })
);

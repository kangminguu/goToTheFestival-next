import { create } from "zustand";

type ModaltStore = {
    isOpen: boolean;
    title: string;
    contents: string;
    confirmText: string;
    onClick: () => void;
    open: (
        title: string,
        contents: string,
        confirmText: string,
        onClick: () => void
    ) => void;
    close: () => void;
};

export const useModalStore = create<ModaltStore>((set) => ({
    isOpen: false,
    title: "",
    contents: "",
    confirmText: "",
    onClick: () => {},
    open: (title, contents, confirmText, onClick) =>
        set({
            isOpen: true,
            title: title,
            contents: contents,
            confirmText: confirmText,
            onClick: onClick,
        }),
    close: () => set({ isOpen: false }),
}));

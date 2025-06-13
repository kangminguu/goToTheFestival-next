import { create } from "zustand";

type AlertStore = {
    isOpen: boolean;
    content: string;
    open: (content: string) => void;
    close: () => void;
};

export const useAlertStore = create<AlertStore>((set) => ({
    isOpen: false,
    content: "",
    open: (content) => set({ isOpen: true, content: content }),
    close: () => set({ isOpen: false }),
}));

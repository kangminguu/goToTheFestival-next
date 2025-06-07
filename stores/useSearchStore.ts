import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SearchStore = {
    keywords: string[];
    addKeyword: (keyword: string) => void;
    delKeyword: (keyword: string) => void;
    removeAllKeyword: () => void;
};

export const useSearchStore = create<SearchStore>()(
    persist(
        (set) => ({
            keywords: [],
            addKeyword: (keyword) =>
                set((state) => ({
                    keywords: [...state.keywords.slice(-4), keyword],
                })),
            delKeyword: (keyword) =>
                set((state) => ({
                    keywords: state.keywords.filter((k) => keyword !== k),
                })),
            removeAllKeyword: () => set({ keywords: [] }),
        }),
        {
            name: "keywords",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

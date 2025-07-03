import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SearchStore = {
    keywords: string[];
    addKeyword: (keyword: string) => void;
    delKeyword: (keyword: string) => void;
    removeAllKeyword: () => void;
};

/**
 * 검색바에서 form에 제출한 값을 배열로 로컬스토리지에 저장합니다.
 */
export const useSearchStore = create<SearchStore>()(
    persist(
        (set) => ({
            keywords: [],
            addKeyword: (keyword) =>
                set((state) => ({
                    keywords: [keyword, ...state.keywords.slice(-9)], // 최대 10개까지 저장
                })),
            delKeyword: (keyword) =>
                set((state) => ({
                    keywords: state.keywords.filter((k) => keyword !== k), // 가장 마지막 키워드 삭제
                })),
            removeAllKeyword: () => set({ keywords: [] }), // 모든 키워드 삭제
        }),
        {
            name: "keywords",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

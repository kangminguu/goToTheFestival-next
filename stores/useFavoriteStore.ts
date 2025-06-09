import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FavoriteStore = {
    favorites: string[];
    // addFavorites: (contentId: string) => void;
    // delFavorites: (contentId: string) => void;
    clickFavorite: (contentId: string) => void;
};

/**
 * 찜한 축제를 로컬스토리지에 저장합니다.
 */
export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set) => ({
            favorites: [],
            // addFavorites: (contentId) =>
            //     set((state) => ({
            //         favorites: [...state.favorites, contentId], // 찜 추가
            //     })),
            // delFavorites: (contentId) =>
            //     set((state) => ({
            //         favorites: state.favorites.filter(
            //             (item) => item !== contentId
            //         ), // 찜 삭제
            //     })),
            clickFavorite: (contentId) =>
                set((state) => ({
                    favorites: state.favorites.includes(contentId)
                        ? state.favorites.filter((item) => item !== contentId)
                        : [...state.favorites, contentId],
                })),
        }),
        {
            name: "favorites",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

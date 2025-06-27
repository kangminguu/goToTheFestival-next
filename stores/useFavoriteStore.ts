import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FavoriteStore = {
    favorites: string[];
    clickFavorite: (contentId: string) => void;
};

/**
 * 찜한 축제를 로컬스토리지에 저장합니다.
 */
export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set) => ({
            favorites: [],
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

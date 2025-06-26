import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FestivalInfo = {
    contentid: string;
    firstimage: string;
    firstimage2: string;
    title: string;
    eventstartdate: string;
    eventenddate: string;
    addr1: string;
    mapx: string;
    mapy: string;
};

type FavoriteStore = {
    favorites: Record<string, FestivalInfo>;
    clickFavorite: (festival: FestivalInfo) => void;
};

/**
 * 찜한 축제를 로컬스토리지에 저장합니다.
 */
export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set) => ({
            favorites: {},
            clickFavorite: (festival) =>
                set((state) => {
                    const exists = state.favorites.hasOwnProperty(
                        festival.contentid
                    );

                    const updated = { ...state.favorites };
                    if (exists) {
                        delete updated[festival.contentid]; // 찜 해제
                    } else {
                        updated[festival.contentid] = festival; // 찜 추가
                    }

                    return { favorites: updated };
                }),
        }),
        {
            name: "favorites",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

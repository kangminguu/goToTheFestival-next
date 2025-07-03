import { create } from "zustand";

type RegionStore = {
    regionCode: string;
    setRegionCode: (value: string) => void;
};

/**
 * 축제 검색 시 지정한 지역 코드를 저장합니다.
 */
export const useRegionStore = create<RegionStore>((set) => ({
    regionCode: "",
    setRegionCode: (value) => set({ regionCode: value }),
}));

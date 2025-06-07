import { create } from "zustand";

type RegionStore = {
    regionCode: string;
    setRegionCode: (value: string) => void;
};

export const useRegionStore = create<RegionStore>((set) => ({
    regionCode: "",
    setRegionCode: (value) => set({ regionCode: value }),
}));

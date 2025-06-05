import { create } from "zustand";

interface RegionStore {
    regionCode: string;
    setRegionCode: (value: string) => void;
}

export const useRegionStore = create<RegionStore>((set) => ({
    regionCode: "",
    setRegionCode: (value) => set({ regionCode: value }),
}));

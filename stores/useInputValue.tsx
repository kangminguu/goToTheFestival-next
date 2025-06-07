import { create } from "zustand";

type InputValueStore = {
    inputValue: string;
    setInputValue: (value: string) => void;
};

export const useInputValueStore = create<InputValueStore>((set) => ({
    inputValue: "",
    setInputValue: (value) => set({ inputValue: value }),
}));

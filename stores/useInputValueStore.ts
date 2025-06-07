import { create } from "zustand";

type InputValueStore = {
    inputValue: string;
    setInputValue: (value: string) => void;
};

/**
 * 검색바 입력값 inputValue를 저장합니다.
 */
export const useInputValueStore = create<InputValueStore>((set) => ({
    inputValue: "",
    setInputValue: (value) => set({ inputValue: value }),
}));

import { create } from "zustand";
import { getLastDayOfMonth, getToday } from "../lib/utils";
import convertYYYYMMDDToDate from "../lib/utils/convertYYYYMMDDToDate";

type EventDateStore = {
    eventDate: [Date, Date];
    setEventDate: (value: [Date, Date]) => void;
};

/**
 * 축제 검색 시 지정한 기간을 저장합니다.
 * 초기값은 오늘로
 */
export const useEventDateStore = create<EventDateStore>((set) => ({
    eventDate: [
        convertYYYYMMDDToDate(getToday()),
        convertYYYYMMDDToDate(getToday()),
    ],
    setEventDate: (value) => set({ eventDate: value }),
}));

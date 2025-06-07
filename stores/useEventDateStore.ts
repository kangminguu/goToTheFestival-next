import { create } from "zustand";
import { getLastDayOfMonth, getToday } from "../lib/utils";
import convertYYYYMMDDToDate from "../lib/utils/convertYYYYMMDDToDate";

type EventDateStore = {
    eventDate: [Date, Date];
    setEventDate: (value: [Date, Date]) => void;
};

export const useEventDateStore = create<EventDateStore>((set) => ({
    eventDate: [
        convertYYYYMMDDToDate(getToday()),
        convertYYYYMMDDToDate(getLastDayOfMonth()),
    ],
    setEventDate: (value) => set({ eventDate: value }),
}));

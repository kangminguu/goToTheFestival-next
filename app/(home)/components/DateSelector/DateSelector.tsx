"use client";

import { useState } from "react";
import DateSelectorButton from "./DateSelectorButton";
import DateSelectorCalendar from "./DateSelectorCalendar";

interface DateSelectorProps {
    startDate: string;
    endDate: string;
    setSelectedDate: (dateRange: {
        startDate: string;
        endDate: string;
    }) => void;
}

/**
 * 축제 검색 날짜 기간을 지정하는 컴포넌트입니다.
 * @returns DateSelector
 */
export default function DateSelector({
    startDate,
    endDate,
    setSelectedDate,
}: DateSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    return !isOpen ? (
        <DateSelectorButton startDate={startDate} endDate={endDate} open={() => setIsOpen(true)} /> // 닫힘
    ) : (
        <DateSelectorCalendar startDate={startDate} endDate={endDate} setSelectedDate={setSelectedDate} close={() => setIsOpen(false)} /> // 열림
    );
}

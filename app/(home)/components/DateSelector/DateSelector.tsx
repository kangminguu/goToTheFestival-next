"use client";

import { useState } from "react";
import DateSelectorButton from "./DateSelectorButton";
import DateSelectorCalendar from "./DateSelectorCalendar";

/**
 * 축제 검색 날짜 기간을 지정하는 컴포넌트입니다.
 * @returns DateSelector
 */
export default function DateSelector() {
    const [isOpen, setIsOpen] = useState(false);

    return !isOpen ? (
        <DateSelectorButton open={() => setIsOpen(true)} /> // 닫힘
    ) : (
        <DateSelectorCalendar close={() => setIsOpen(false)} /> // 열림
    );
}

"use client";

import { useState } from "react";
import Calendar from "react-calendar";
// import { getToday } from "../../../../lib/utils";
import convertYYYYMMDDToDate from "../../../../lib/utils/convertYYYYMMDDToDate";
import { useEventDateStore } from "../../../../stores/useEventDateStore";
import { getLastDayOfMonth, getToday } from "../../../../lib/utils";

export default function DateSelector() {
    // const today = convertYYYYMMDDToDate(getToday());

    const [isOpen, setIsOpen] = useState(false);

    const { eventDate, setEventDate } = useEventDateStore();

    // const [range, setRange] = useState<[Date, Date] | null>([
    //     convertYYYYMMDDToDate(eventDate[0]),
    //     convertYYYYMMDDToDate(eventDate[1]),
    // ]); // ✅ 수정된 라인

    // ✅ 날짜 포맷 함수
    const formatDate = (date: Date) => {
        const dayKor = ["일", "월", "화", "수", "목", "금", "토"];
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const weekday = dayKor[date.getDay()];
        return `${month}.${day} (${weekday})`;
    };

    const rangeText = eventDate
        ? `${formatDate(eventDate[0])} ~ ${formatDate(eventDate[1])}`
        : "기간을 선택하세요"; // ✅ 수정된 라인

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:max-w-[335px] w-full py-[16px] px-[14px] border border-border-base hover:bg-background-hover flex flex-row justify-between rounded-[8px] items-center drag-prevent animation-color"
            >
                <div className="flex flex-row gap-[10px]">
                    <img
                        src="/assets/calendar/calendar.svg"
                        alt="calendar"
                        className="w-[20px]"
                    />

                    <span className="font-pretendard text-font-primary font-semibold text-[15px]">
                        {rangeText} {/* ✅ 수정된 라인 */}
                    </span>
                </div>

                <span className="font-pretendard text-font-activeButton font-semibold text-[14px]">
                    변경
                </span>
            </button>
        );
    } else {
        return (
            <div className="relative md:max-w-[335px] w-full">
                <div className="min-w-[335px] md:max-w-[335px] py-[16px] px-[14px] border border-border-base bg-background-base flex flex-col rounded-[8px] gap-[20px] md:shadow-window drag-prevent animation-color md:absolute">
                    <div className="flex flex-row gap-[10px] items-center">
                        <img
                            src="/assets/calendar/calendar.svg"
                            alt="calendar"
                            className="w-[20px]"
                        />

                        <span className="font-pretendard text-font-primary font-semibold text-[15px]">
                            {rangeText} {/* ✅ 수정된 라인 */}
                        </span>
                    </div>

                    <Calendar
                        onChange={(value) => {
                            if (Array.isArray(value)) {
                                setEventDate(value); // ✅ 수정된 라인
                            }
                        }}
                        selectRange
                        calendarType="gregory"
                        formatDay={(_, date) => String(date.getDate())}
                        prevLabel={
                            <img
                                src="/assets/arrow.svg"
                                alt="prev"
                                className="w-[24px]"
                            />
                        }
                        nextLabel={
                            <img
                                src="/assets/arrow.svg"
                                alt="prev"
                                className="w-[24px]"
                            />
                        }
                        prev2Label={null}
                        next2Label={null}
                        value={eventDate || undefined} // ✅ 수정된 라인
                    />

                    <div className="flex flex-row justify-between">
                        <button
                            onClick={() =>
                                setEventDate([
                                    convertYYYYMMDDToDate(getToday()),
                                    convertYYYYMMDDToDate(getLastDayOfMonth()),
                                ])
                            } // ✅ 수정된 라인
                            className="flex flex-row gap-[5px]"
                        >
                            <img
                                src="/assets/reset.svg"
                                alt="calendar"
                                className="w-[14px]"
                            />
                            <span className="font-pretendard text-font-primary font-semibold text-[14px]">
                                초기화
                            </span>
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="font-pretendard text-[14px] font-semibold text-font-activeButton"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

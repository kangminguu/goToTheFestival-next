import Calendar from "react-calendar";
import "../../../../styles/calendar.custom.css";

import { useEventDateStore } from "../../../../stores/index";
import {
    getToday,
    convertStringDateToDate,
    convertDateToShowFormat,
} from "../../../../lib/utils";
import Button from "../../../../components/Button/Button";
import { useEffect, useRef } from "react";

interface DateSelectorCalendarProps {
    close: () => void;
    startDate: string;
    endDate: string;
    setSelectedDate: (dateRange: {
        startDate: string;
        endDate: string;
    }) => void;
}

const thisYear = new Date().getFullYear(); // 올해 년도

const PERIODS = {
    full: ["2010-01-01", "2050-12-31"], // 전체기간
    lastYear: [`${thisYear - 1}-01-01`, `${thisYear - 1}-12-31`], // 작년
    thisYear: [`${thisYear}-01-01`, `${thisYear}-12-31`], // 올해
    nextYear: [`${thisYear + 1}-01-01`, `${thisYear + 1}-12-31`], // 내년
    today: [getToday(), getToday()], // 오늘
};

const getConvertedPeriod = (key) => PERIODS[key].map(convertStringDateToDate);

/**
 * @param 클릭 이벤트 : 닫힘 상태로 변경
 * @returns DateSelectorCalendar 컴포넌트
 */
export default function DateSelectorCalendar({
    close,
    startDate,
    endDate,
    setSelectedDate,
}: DateSelectorCalendarProps) {
    // const { eventDate, setEventDate } = useEventDateStore();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                close(); // 외부영역 클릭 및 터치 시 닫기
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [close]);

    // 기간 간편 선택 클릭 이벤트
    const handleSetPeriod = (key) => {
        setSelectedDate({
            startDate: PERIODS[key][0],
            endDate: PERIODS[key][1],
        });
    };

    return (
        <div ref={ref} className="relative md:max-w-[335px] w-full md:z-10">
            <div className="min-w-[335px] md:max-w-[335px] py-[16px] px-[14px] border border-border-base bg-background-base flex flex-col rounded-[8px] gap-[20px] md:shadow-window drag-prevent animation-color md:absolute">
                {/* icon | MM.DD (e) ~ MM.DD (e) */}
                <div className="row-center gap-[10px]">
                    <img
                        src="/assets/calendar/calendar.svg"
                        alt="calendar"
                        className="w-[20px]"
                    />

                    <span className="font-semibold text-[15px]">
                        {`${convertDateToShowFormat(
                            convertStringDateToDate(startDate),
                        )} ~ ${convertDateToShowFormat(convertStringDateToDate(endDate))}`}
                    </span>
                </div>

                {/* calendar */}
                <Calendar
                    onChange={(value) => {
                        if (Array.isArray(value)) {
                            setSelectedDate({
                                startDate: value[0].toISOString().split("T")[0],
                                endDate: value[1].toISOString().split("T")[0],
                            });
                        }
                    }}
                    selectRange
                    calendarType="gregory"
                    formatDay={(_, date) => String(date.getDate())}
                    prev2Label={
                        <img
                            src="/assets/arrow/double_arrow.svg"
                            alt="prev_year"
                            className="w-[24px]"
                        />
                    }
                    prevLabel={
                        <img
                            src="/assets/arrow/arrow.svg"
                            alt="prev_month"
                            className="w-[24px]"
                        />
                    }
                    nextLabel={
                        <img
                            src="/assets/arrow/arrow.svg"
                            alt="next_month"
                            className="w-[24px]"
                        />
                    }
                    next2Label={
                        <img
                            src="/assets/arrow/double_arrow.svg"
                            alt="next_year"
                            className="w-[24px]"
                        />
                    }
                    value={[
                        convertStringDateToDate(startDate),
                        convertStringDateToDate(endDate),
                    ]}
                />

                {/* 빠른 기간 선택 버튼 */}
                <div className="flex flex-wrap gap-[5px]">
                    <Button
                        title="전체"
                        onClick={() => handleSetPeriod("full")}
                    />
                    <Button
                        title={`작년 (${thisYear - 1}년)`}
                        onClick={() => handleSetPeriod("lastYear")}
                    />
                    <Button
                        title={`올해 (${thisYear}년)`}
                        onClick={() => handleSetPeriod("thisYear")}
                    />
                    <Button
                        title={`내년 (${thisYear + 1}년)`}
                        onClick={() => handleSetPeriod("nextYear")}
                    />
                </div>

                {/* icon 초기화 | 닫기 */}
                <div className="row-center justify-between">
                    <button
                        onClick={() => handleSetPeriod("today")}
                        className="flex flex-row gap-[5px]"
                    >
                        <img
                            src="/assets/reset.svg"
                            alt="calendar"
                            className="w-[14px]"
                        />
                        <span className="font-semibold text-[14px]">오늘</span>
                    </button>

                    <button
                        onClick={close}
                        className="text-[14px] font-semibold text-font-activeButton"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}

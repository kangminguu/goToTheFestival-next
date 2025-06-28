import Calendar from "react-calendar";
import "../../../../styles/calendar.custom.css";

import { useEventDateStore } from "../../../../stores/index";
import { convertSelectedDateText } from "./utils";
import {
    getLastDayOfMonth,
    getToday,
    convertYYYYMMDDToDate,
} from "../../../../lib/utils";
import { start } from "repl";
import Button from "../../../../components/Button/Button";

interface DateSelectorCalendarProps {
    close: () => void;
}

/**
 * @param 클릭 이벤트 : 닫힘 상태로 변경
 * @returns DateSelectorCalendar 컴포넌트
 */
export default function DateSelectorCalendar({
    close,
}: DateSelectorCalendarProps) {
    const { eventDate, setEventDate } = useEventDateStore();

    const thisYear = new Date().getFullYear();

    const setPeriod = {
        lastYear: {
            start: convertYYYYMMDDToDate(`${thisYear - 1}0101`),
            end: convertYYYYMMDDToDate(`${thisYear - 1}1231`),
        },
        thisYear: {
            start: convertYYYYMMDDToDate(`${thisYear}0101`),
            end: convertYYYYMMDDToDate(`${thisYear}1231`),
        },
        nextYear: {
            start: convertYYYYMMDDToDate(`${thisYear + 1}0101`),
            end: convertYYYYMMDDToDate(`${thisYear + 1}1231`),
        },
        today: {
            start: convertYYYYMMDDToDate(getToday()),
            end: convertYYYYMMDDToDate(getToday()),
        },
        full: {
            start: convertYYYYMMDDToDate("20100101"),
            end: convertYYYYMMDDToDate("20501231"),
        },
    };

    return (
        <div className="relative md:max-w-[335px] w-full md:z-10">
            <div className="min-w-[335px] md:max-w-[335px] py-[16px] px-[14px] border border-border-base bg-background-base flex flex-col rounded-[8px] gap-[20px] md:shadow-window drag-prevent animation-color md:absolute">
                {/* icon | MM.DD (e) ~ MM.DD (e) */}
                <div className="row-center gap-[10px]">
                    <img
                        src="/assets/calendar/calendar.svg"
                        alt="calendar"
                        className="w-[20px]"
                    />

                    <span className="font-semibold text-[15px]">
                        {`${convertSelectedDateText(
                            eventDate[0]
                        )} ~ ${convertSelectedDateText(eventDate[1])}`}
                    </span>
                </div>

                {/* calendar */}
                <Calendar
                    onChange={(value) => {
                        if (Array.isArray(value)) {
                            setEventDate(value);
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
                    value={eventDate}
                />

                {/* 2024년 2025년 2026년 전체 */}
                <div className="flex flex-wrap gap-[5px]">
                    <Button
                        title="전체"
                        onClick={() => {
                            setEventDate([
                                setPeriod.full.start,
                                setPeriod.full.end,
                            ]);
                        }}
                    />
                    <Button
                        title={`작년 (${thisYear - 1}년)`}
                        onClick={() => {
                            setEventDate([
                                setPeriod.lastYear.start,
                                setPeriod.lastYear.end,
                            ]);
                        }}
                    />
                    <Button
                        title={`올해 (${thisYear}년)`}
                        onClick={() => {
                            setEventDate([
                                setPeriod.thisYear.start,
                                setPeriod.thisYear.end,
                            ]);
                        }}
                    />
                    <Button
                        title={`내년 (${thisYear + 1}년)`}
                        onClick={() => {
                            setEventDate([
                                setPeriod.nextYear.start,
                                setPeriod.nextYear.end,
                            ]);
                        }}
                    />
                </div>

                {/* icon 초기화 | 닫기 */}
                <div className="row-center justify-between">
                    <button
                        onClick={() =>
                            setEventDate([
                                setPeriod.today.start,
                                setPeriod.today.end,
                            ])
                        }
                        className="flex flex-row gap-[5px]"
                    >
                        <img
                            src="/assets/reset.svg"
                            alt="calendar"
                            className="w-[14px]"
                        />
                        <span className="font-semibold text-[14px]">오늘로 초기화</span>
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

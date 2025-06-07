import Calendar from "react-calendar";
import "./calendarCustom.css";

import { useEventDateStore } from "../../../../stores/useEventDateStore";
import { convertSelectedDateText } from "./utils";
import { getLastDayOfMonth, getToday } from "../../../../lib/utils";
import convertYYYYMMDDToDate from "../../../../lib/utils/convertYYYYMMDDToDate";

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

    return (
        <div className="relative md:max-w-[335px] w-full">
            <div className="min-w-[335px] md:max-w-[335px] py-[16px] px-[14px] border border-border-base bg-background-base flex flex-col rounded-[8px] gap-[20px] md:shadow-window drag-prevent animation-color md:absolute">
                {/* icon | MM.DD (e) ~ MM.DD (e) */}
                <div className="flex flex-row gap-[10px] items-center">
                    <img
                        src="/assets/calendar/calendar.svg"
                        alt="calendar"
                        className="w-[20px]"
                    />

                    <span className="font-pretendard text-font-primary font-semibold text-[15px]">
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
                    value={eventDate}
                />

                {/* icon 초기화 | 닫기 */}
                <div className="flex flex-row justify-between">
                    <button
                        onClick={() =>
                            setEventDate([
                                convertYYYYMMDDToDate(getToday()),
                                convertYYYYMMDDToDate(getLastDayOfMonth()),
                            ])
                        }
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
                        onClick={close}
                        className="font-pretendard text-[14px] font-semibold text-font-activeButton"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}

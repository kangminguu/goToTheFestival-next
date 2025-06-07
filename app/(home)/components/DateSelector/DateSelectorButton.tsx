import { useEventDateStore } from "../../../../stores/index";
import { convertSelectedDateText } from "./utils";

interface DateSelectorButtonProps {
    open: () => void;
}

/**
 * @param 클릭 이벤트 : 열림 상태로 변경
 * @returns DateSelectorButton 컴포넌트
 */
export default function DateSelectorButton({ open }: DateSelectorButtonProps) {
    const { eventDate } = useEventDateStore();

    return (
        <button
            onClick={open}
            className="md:max-w-[335px] w-full py-[16px] px-[14px] border border-border-base hover:bg-background-hover flex flex-row justify-between rounded-[8px] items-center drag-prevent animation-color"
        >
            <div className="flex flex-row gap-[10px]">
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

            <span className="font-pretendard text-font-activeButton font-semibold text-[14px]">
                변경
            </span>
        </button>
    );
}

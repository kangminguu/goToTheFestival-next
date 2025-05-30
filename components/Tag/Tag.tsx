import { getToday } from "../../lib/utils";

interface TagProps {
    eventStartDate: string;
    eventEndDate: string;
}

type FestivalState = "진행중" | "종료" | "예정";

const tagStyles = {
    종료: "bg-font-secondary",
    진행중: "bg-background-highlight",
    예정: "hidden",
};

export default function Tag({ eventStartDate, eventEndDate }: TagProps) {
    const today = getToday();

    let state: FestivalState;

    if (today < eventStartDate) state = "예정";
    else if (today > eventEndDate) state = "종료";
    else state = "진행중";

    return (
        <div
            className={`${tagStyles[state]} h-fit w-fit px-[10px] py-[4px] rounded-[6px] font-pretendard font-semibold text-[12px] text-font-inverted`}
        >
            {state}
        </div>
    );
}

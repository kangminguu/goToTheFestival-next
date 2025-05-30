import { convertToDotDateFormat } from "../../lib/utils";

type EventDateSizeType = 0 | 1 | 2 | 3; // 사이즈 순서대로

interface EventDateProps {
    eventStartDate: string;
    eventEndDate: string;
    size?: EventDateSizeType;
}

const styles = {
    0: {
        div: "gap-[5px] text-font-secondary",
        img: "w-[20px]",
        svg: "calendar_767676",
        text: "text-[14px]",
    },
    1: {
        div: "gap-[5px] text-font-secondary",
        img: "w-[20px]",
        svg: "calendar_767676",
        text: "text-[15px]",
    },
    2: {
        div: "gap-[8px] text-font-primary",
        img: "w-[20px]",
        svg: "calendar_333333",
        text: "text-[20px]",
    },
    3: {
        div: "gap-[8px] text-font-primary",
        img: "w-[24px]",
        svg: "calendar_333333",
        text: "text-[20px]",
    },
};

export default function EventDate({
    eventStartDate,
    eventEndDate,
    size = 0,
}: EventDateProps) {
    const { div, img, svg, text } = styles[size];
    const eventDate = `${convertToDotDateFormat(
        eventStartDate
    )} - ${convertToDotDateFormat(eventEndDate)}`;

    return (
        <div className={`flex flex-row ${div}`}>
            <img
                className={`${img}`}
                src={`/assets/calendar/${svg}.svg`}
                alt="calendar"
            />
            <p className={`font-pretendard font-medium ${text}`}>{eventDate}</p>
        </div>
    );
}

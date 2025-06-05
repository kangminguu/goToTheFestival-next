import { convertToDotDateFormat } from "../../lib/utils";

type EventDateSizeType = "banner" | "card" | "detailPage";

interface EventDateProps {
    eventStartDate: string;
    eventEndDate: string;
    sizeType: EventDateSizeType;
}

const styles = {
    banner: {
        div: "gap-[5px] text-font-primary",
        img: "md:w-[24px] w-[12px]",
        svg: "calendar",
        text: "md:text-[20px] text-[12px]",
    },
    card: {
        div: "gap-[5px] text-font-secondary",
        img: "md:w-[15px] w-[12px]",
        svg: "calendar_gray",
        text: "md:text-[15px] text-[12px]",
    },
    detailPage: {
        div: "md:gap-[10px] gap-[5px] text-font-primary",
        img: "md:w-[20px] w-[15px]",
        svg: "calendar",
        text: "md:text-[18px] text-[15px]",
    },
};

export default function EventDate({
    eventStartDate,
    eventEndDate,
    sizeType,
}: EventDateProps) {
    const { div, img, svg, text } = styles[sizeType];
    const eventDate = `${convertToDotDateFormat(
        eventStartDate
    )} ~ ${convertToDotDateFormat(eventEndDate)}`;

    return (
        <div className={`flex flex-row ${div} items-center`}>
            <img
                className={`${img}`}
                src={`/assets/calendar/${svg}.svg`}
                alt="calendar"
            />
            <p className={`font-pretendard font-medium ${text}`}>{eventDate}</p>
        </div>
    );
}

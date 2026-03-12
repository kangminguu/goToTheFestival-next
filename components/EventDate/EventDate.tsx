import { CalendarIcon } from "../Icons";

type EventDateSizeType = "banner" | "card" | "detailPage";

interface EventDateProps {
    eventStartDate: string;
    eventEndDate: string;
    sizeType: EventDateSizeType;
}

const styles = {
    banner: {
        div: "gap-[5px]",
        svg: "md:w-[24px] w-[15px] text-[#333333]",
        text: "md:text-[20px] text-[14px]",
    },
    card: {
        div: "gap-[5px] text-font-secondary",
        svg: "w-[15px] text-[#767676]",
        text: "md:text-[15px] text-[12px]",
    },
    detailPage: {
        div: "md:gap-[10px] gap-[5px]",
        svg: "md:w-[20px] w-[15px] text-[#333333]",
        text: "md:text-[18px] text-[15px]",
    },
};

export default function EventDate({
    eventStartDate,
    eventEndDate,
    sizeType,
}: EventDateProps) {
    const { div, svg, text } = styles[sizeType];

    const eventDate = `${eventStartDate.replaceAll(
        "-",
        ".",
    )} ~ ${eventEndDate.replaceAll("-", ".")}`;

    return (
        <div className={`row-center ${div}`}>
            <div className={`group ${svg}`}>
                <CalendarIcon />
            </div>
            <p className={`${text} line-clamp-1`}>{eventDate}</p>
        </div>
    );
}

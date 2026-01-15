import Link from "next/link";
import Address from "../../../../components/Address/Address";
import EventDate from "../../../../components/EventDate/EventDate";
import { BannerFestival } from "./type";

export default function BannerCard({
    festival,
    currentMonth,
}: {
    festival: BannerFestival;
    currentMonth: number;
}) {
    return (
        <Link
            href={`/detail/${festival.contentid}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div
                className="w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: `
                    linear-gradient(
                        to right, 
                        rgba(255, 255, 255, 1) 30%,
                        rgba(255, 255, 255, 0) 100%
                    ), 
                    url(${festival.first_image || "/gotothefestival.png"})`,
                }}
            >
                <div className="min-max-padding md:pt-[50px] pt-[30px] md:pb-[60px] pb-[40px] flex flex-col md:gap-[20px] gap-[10px]">
                    <div>
                        <p className="font-semibold text-font-secondary md:text-[24px] text-[16px]">
                            이 달의 축제
                        </p>

                        <p className="font-bold text-font-highlight md:text-[32px] text-[20px]">
                            {currentMonth}월
                        </p>
                    </div>

                    <div className="font-bold md:text-[32px] text-[20px] line-clamp-1">
                        {festival.title}
                    </div>

                    <div className="flex flex-col md:gap-[10px] gap-[3px]">
                        <Address
                            address={festival.addr1 || "-"}
                            sizeType="banner"
                        />

                        <EventDate
                            eventStartDate={festival.event_start}
                            eventEndDate={festival.event_end}
                            sizeType="banner"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
}

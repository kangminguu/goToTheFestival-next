import Link from "next/link";
import { getToday } from "../../../../lib/utils";
import Address from "../../../../components/Address/Address";
import EventDate from "../../../../components/EventDate/EventDate";

export default function BannerCard({ festival }) {
    const thisMonth = parseInt(getToday().substring(4, 6)); // 이번 달

    return (
        <Link href={`/detail/${festival.contentid}`}>
            <div
                className="w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: `
                    linear-gradient(
                        to right, 
                        rgba(255, 255, 255, 1) 30%,
                        rgba(255, 255, 255, 0) 100%
                    ), 
                    url(${festival.firstimage})`,
                }}
            >
                <div className="min-max-padding md:pt-[50px] pt-[30px] md:pb-[60px] pb-[40px] flex flex-col md:gap-[20px] gap-[10px]">
                    <div>
                        <p className="font-pretendard font-semibold text-font-secondary md:text-[24px] text-[16px]">
                            이 달의 축제
                        </p>

                        <p className="font-pretendard font-bold text-font-highlight md:text-[32px] text-[20px]">
                            {thisMonth}월
                        </p>
                    </div>

                    <div className="font-pretendard font-bold text-font-primary md:text-[32px] text-[20px]">
                        {festival.title}
                    </div>

                    <div className="flex flex-col md:gap-[10px] gap-[3px]">
                        <Address address={festival.addr1} sizeType="banner" />

                        <EventDate
                            eventStartDate={festival.eventstartdate}
                            eventEndDate={festival.eventenddate}
                            sizeType="banner"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
}

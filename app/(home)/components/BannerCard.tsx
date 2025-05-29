import Link from "next/link";
import { convertToDotDateFormat, getToday } from "../../../lib/utils";

export default function BannerCard({ festival }) {
    const address = festival.addr1.split(" ").slice(0, 2).join(" ");
    const startDate = convertToDotDateFormat(festival.eventstartdate);
    const endDate = convertToDotDateFormat(festival.eventenddate);
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
                <div className="min-w-[320px] max-w-[1200px] mx-auto pt-[70px] pb-[100px] px-[50px] flex flex-col gap-[20px]">
                    <div>
                        <p className="font-pretendard font-bold text-[24px] text-font-secondary">
                            이 달의 축제
                        </p>

                        <p className="font-pretendard font-bold text-[32px] text-font-highlight">
                            {thisMonth}월
                        </p>
                    </div>

                    <div className="font-pretendard font-bold text-[32px] text-font-primary">
                        {festival.title}
                    </div>

                    <div className="flex flex-col gap-[10px]">
                        <div className="flex flex-row gap-[8px] text-font-primary">
                            <img
                                className="w-[24px]"
                                src="/assets/location.svg"
                                alt="location"
                            />
                            <p className="font-pretendard font-medium text-[20px]">
                                {address}
                            </p>
                        </div>

                        <div className="flex flex-row gap-[8px] text-font-primary">
                            <img
                                className="w-[24px]"
                                src="/assets/calendar.svg"
                                alt="calendar"
                            />
                            <p className="font-pretendard font-medium text-[20px]">
                                {startDate} - {endDate}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

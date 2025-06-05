import Image from "next/image";
import Tag from "../Tag/Tag";
import Address from "../Address/Address";
import EventDate from "../EventDate/EventDate";
import Link from "next/link";
import MiniFestivalCardSkeleton from "./MiniFestivalCardSkeleton";

export default function MiniFestivalCard({ festival, isLoading = false }) {
    if (isLoading) return <MiniFestivalCardSkeleton />;

    return (
        <Link
            href={`/detail/${festival.contentid}`}
            className="flex flex-col gap-[10px] w-[282px] p-[10px] rounded-[15px] bg-background-base hover:bg-background-hover transition-colors duration-300 ease-in-out"
        >
            <div className="relative h-[190px] w-full overflow-hidden rounded-[12px]">
                <Image
                    src={festival.firstimage}
                    alt={festival.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
            </div>

            <div className="flex flex-row gap-[10px] items-top">
                <Tag
                    eventStartDate={festival.eventstartdate}
                    eventEndDate={festival.eventenddate}
                />
                <div className="h-[52px]">
                    <p className="font-pretendard font-medium text-font-primary text-[16px] whitespace-normal break-words">
                        {festival.title}
                    </p>
                </div>
            </div>

            <div className="flex flex-row gap-[5px] items-center">
                <img src="/assets/flame/flame.svg" alt="rating" />
                <p className="font-pretendard font-medium text-font-secondary text-[14px]">
                    {/* 임의 값 */}
                    {"4.3"}
                </p>
            </div>

            <Address address={festival.addr1} sizeType="card" />

            <EventDate
                eventStartDate={festival.eventstartdate}
                eventEndDate={festival.eventenddate}
                sizeType="card"
            />
        </Link>
    );
}

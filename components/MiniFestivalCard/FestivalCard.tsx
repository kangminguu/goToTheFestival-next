import Image from "next/image";
import Tag from "../Tag/Tag";
import Address from "../Address/Address";
import EventDate from "../EventDate/EventDate";
import Link from "next/link";
import FestivalCardSkeleton from "./FestivalCardSkeleton";
import Rating from "../Rating/Rating";

export default function MiniFestivalCard({ festival, isLoading = false }) {
    if (isLoading) return <FestivalCardSkeleton />;

    return (
        <Link
            href={`/detail/${festival.contentid}`}
            className="flex md:flex-col flex-row-reverse w-full min-h-[145px] gap-[10px] p-[10px] rounded-[8px] bg-background-base hover:bg-background-hover animation-color"
        >
            {/* 이미지 */}
            <div className="relative shrink-0 w-[125px] h-[125px] overflow-hidden rounded-[6px] md:w-full md:h-[190px]">
                <Image
                    src={festival.firstimage}
                    alt={festival.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 125px, (max-width: 1024px) 50vw, 25vw"
                />

                <button className="absolute md:w-[30px] w-[24px] top-[5px] right-[5px] md:top-[10px] md:right-[10px]">
                    <img src="/assets/favorite/favorite.svg" alt="favorite" />
                </button>
            </div>

            <div className="flex flex-col w-full">
                {/* 태그, 제목 */}
                <div className="flex flex-row gap-[10px] items-top">
                    <Tag
                        eventStartDate={festival.eventstartdate}
                        eventEndDate={festival.eventenddate}
                    />
                    <div className="h-[52px]">
                        <span className="line-clamp-2">{festival.title}</span>
                    </div>
                </div>

                {/* 평점, 위치, 기간 */}
                <div className="flex flex-col md:gap-[8px] gap-[5px]">
                    <Rating rating={5} />

                    <Address address={festival.addr1} sizeType="card" />

                    <EventDate
                        eventStartDate={festival.eventstartdate}
                        eventEndDate={festival.eventenddate}
                        sizeType="card"
                    />
                </div>
            </div>
        </Link>
    );
}

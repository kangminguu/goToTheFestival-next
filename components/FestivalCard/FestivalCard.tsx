import Image from "next/image";
import Tag from "../Tag/Tag";
import Address from "../Address/Address";
import EventDate from "../EventDate/EventDate";
import Link from "next/link";
import Rating from "../Rating/Rating";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

export default function FestivalCard({ festival }) {
    return (
        <Link
            href={`/detail/${festival.contentid}`}
            className="flex md:flex-col flex-row-reverse w-full min-h-[145px] gap-[10px] p-[10px] rounded-[8px] hover-active animation-color"
        >
            {/* 이미지 */}
            <div className="relative shrink-0 w-[125px] h-[125px] overflow-hidden rounded-[6px] md:w-full md:h-[190px]">
                <Image
                    src={
                        festival.firstimage ||
                        festival.firstimage2 ||
                        "/assets/no_image.png"
                    }
                    alt={festival.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 125px, (max-width: 1024px) 50vw, 25vw"
                />

                {/* 찜 버튼 */}
                <FavoriteButton
                    contentid={festival.contentid}
                    sizeType="card"
                />
            </div>

            <div className="flex flex-col w-full">
                {/* 태그, 제목 */}
                <div className="flex flex-row gap-[8px] items-top h-[52px]">
                    <Tag
                        eventStartDate={festival.eventstartdate}
                        eventEndDate={festival.eventenddate}
                    />

                    <p className="line-clamp-2 break-words break-all text-[15px] md:text-[16px] h-fit">
                        {festival.title}
                    </p>
                </div>

                {/* 평점, 위치, 기간 */}
                <div className="flex flex-col md:gap-[8px] gap-[5px]">
                    <Rating rating={0} />

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

import FavoriteButton from "../../../../components/FavoriteButton/FavoriteButton";
import Rating from "../../../../components/Rating/Rating";
import Tag from "../../../../components/Tag/Tag";

export default function DetailTitleSection({
    contentid,
    firstimage,
    firstimage2,
    title,
    eventstartdate,
    eventenddate,
    addr1,
}) {
    return (
        <div className="flex flex-col gap-[5px] md:gap-[10px] my-[20px]">
            <div className="flex flex-row items-start justify-between gap-[10px]">
                {/* 태그와 축제 타이틀 */}
                <div className="flex flex-row items-start gap-[10px]">
                    <div className="h-[27px] md:h-[36px] row-center">
                        <Tag
                            eventStartDate={eventstartdate}
                            eventEndDate={eventenddate}
                        />
                    </div>
                    <h2 className="text-[18px] md:text-[24px] line-clamp-2 break-words break-all h-fit">
                        {title}
                    </h2>
                </div>

                {/* 찜 버튼 */}
                <div className="md:h-[36px] row-center">
                    <FavoriteButton
                        contentid={contentid}
                        firstimage={firstimage}
                        firstimage2={firstimage2}
                        title={title}
                        eventstartdate={eventstartdate}
                        eventenddate={eventenddate}
                        addr1={addr1}
                        sizeType="detailPage"
                    />
                </div>
            </div>

            <div className="row-center gap-[10px]">
                <Rating sizeType="detailPage" />

                <span className="bg-font-secondary w-[4px] h-[4px] rounded-full" />

                <button className="row-center gap-[5px] text-font-secondary text-[14px] md:text-[16px]">
                    14개 평가
                    <img
                        src="/assets/arrow/arrow_gray.svg"
                        alt="rating"
                        className=" rotate-180 w-[14px] md:w-[16px]"
                    />
                </button>
            </div>
        </div>
    );
}

import FavoriteButton from "../../../../../components/FavoriteButton/FavoriteButton";
import Rating from "../../../../../components/Rating/Rating";
import Tag from "../../../../../components/Tag/Tag";
import {
    convertStringDateToDate,
    convertToDashDateFormat,
    convertToDotDateFormat,
} from "../../../../../lib/utils";
import ScrollToRatingSectionButton from "./ScrollToRatingSectionButton";

export default function DetailTitleSection({
    contentid,
    title,
    eventstartdate,
    eventenddate,
    avgRating,
    ratingCount,
}: {
    contentid: string;
    title: string;
    eventstartdate: string;
    eventenddate: string;
    avgRating: number;
    ratingCount: number;
}) {
    const formattedStartDate = convertStringDateToDate(
        convertToDashDateFormat(eventstartdate),
    );
    const formattedEndDate = convertStringDateToDate(
        convertToDashDateFormat(eventenddate),
    );

    return (
        <div className="flex flex-col gap-[5px] md:gap-[10px] my-[20px]">
            <div className="flex flex-row items-start justify-between gap-[10px]">
                {/* 태그와 축제 타이틀 */}
                <div className="flex flex-row items-start gap-[10px]">
                    <div className="h-[27px] md:h-[36px] row-center">
                        <Tag
                            eventStartDate={
                                formattedStartDate.toISOString().split("T")[0]
                            }
                            eventEndDate={
                                formattedEndDate.toISOString().split("T")[0]
                            }
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
                        sizeType="detailPage"
                    />
                </div>
            </div>

            <div className="row-center gap-[10px]">
                <Rating rating={avgRating} sizeType="detailPage" />

                <span className="bg-font-secondary w-[4px] h-[4px] rounded-full" />

                <ScrollToRatingSectionButton ratingCount={ratingCount} />
            </div>
        </div>
    );
}

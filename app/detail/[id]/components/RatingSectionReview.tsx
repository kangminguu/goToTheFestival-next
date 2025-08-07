import Rating from "../../../../components/Rating/Rating";
import {
    convertToDotDateFormat,
    convertYYYYMMDDToDate,
    getToday,
} from "../../../../lib/utils";
import getDifferenceDates from "../../../../lib/utils/getDifferenceDates";

export default function RatingSectionReview({
    userName,
    rating,
    content,
    created_at,
}) {
    // 오늘
    const today = convertYYYYMMDDToDate(getToday());
    // 작성일
    const createdDate = convertYYYYMMDDToDate(
        created_at.split("T")[0].split("-").join("")
    );
    // 작성 경과 시간
    const lastDate = getDifferenceDates(createdDate, today);

    let displayDate = "";

    if (lastDate === 0) {
        displayDate = "오늘";
    } else if (lastDate >= 1 && lastDate <= 6) {
        displayDate = `${lastDate}일 전`;
    } else if (lastDate === 7) {
        displayDate = "일주일 전";
    } else {
        displayDate = convertToDotDateFormat(
            created_at.split("T")[0].split("-").join("")
        );
    }

    return (
        <div className="flex flex-col gap-[10px] md:gap-[15px]">
            <span className="w-full bg-border-base h-[1px]" />

            <div className="row-center justify-between">
                <div className="row-center gap-[4px] md:gap-[10px]">
                    {/* 사용자 이름 */}
                    <span className="text-[14px] md:text-[16px]">
                        {userName ? userName : "사용자"}
                    </span>
                    {/* 평점 */}
                    <Rating rating={rating} sizeType="ratingSection" />
                </div>

                {/* 작성 날짜 */}
                <span className="text-font-secondary text-[12px] md:text-[14px]">
                    {displayDate}
                </span>
            </div>

            {/* 후기 내용 */}
            <p className="text-font-secondary text-[15px] md:text-[16px]">
                {content}
            </p>
        </div>
    );
}

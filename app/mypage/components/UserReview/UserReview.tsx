import Link from "next/link";
import Rating from "../../../../components/Rating/Rating";
import {
    convertToDotDateFormat,
    convertYYYYMMDDToDate,
    getToday,
} from "../../../../lib/utils";
import getDifferenceDates from "../../../../lib/utils/getDifferenceDates";

export default function UserReview({ review }) {
    // 오늘
    const today = convertYYYYMMDDToDate(getToday());
    // 작성일
    const createdDate = convertYYYYMMDDToDate(
        review.created_at.split("T")[0].split("-").join("")
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
            review.created_at.split("T")[0].split("-").join("")
        );
    }

    return (
        <>
            <span className="w-full bg-border-base h-[1px]" />
            <Link
                href={`/detail/${review.contentId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex rounded-[8px] px-[15px] py-[10px] flex-col gap-[10px] md:gap-[15px] hover-active"
            >
                {/* 축제 이름 */}
                <span className="text-[14px] text-start md:text-[16px] line-clamp-1">
                    {review.title}
                </span>

                <div className="row-center justify-between">
                    {/* 평점 */}
                    <Rating rating={review.rating} sizeType="ratingSection" />
                    {/* 작성 날짜 */}
                    <span className="text-font-secondary text-[12px] md:text-[14px]">
                        {displayDate}
                    </span>
                </div>

                {/* 후기 내용 */}
                <p className="text-font-secondary text-start text-[14px] md:text-[16px] line-clamp-2">
                    {review.content}
                </p>
            </Link>
        </>
    );
}

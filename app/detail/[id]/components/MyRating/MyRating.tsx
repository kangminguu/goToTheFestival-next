import Rating from "../../../../../components/Rating/Rating";
import {
    convertToDotDateFormat,
    convertYYYYMMDDToDate,
    getToday,
} from "../../../../../lib/utils";
import getDifferenceDates from "../../../../../lib/utils/getDifferenceDates";

export default function MyRating({ userRating }) {
    // 오늘
    const today = convertYYYYMMDDToDate(getToday());
    // 작성일
    const createdDate = convertYYYYMMDDToDate(
        userRating.created_at.split("T")[0].split("-").join("")
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
            userRating.created_at.split("T")[0].split("-").join("")
        );
    }

    return (
        <div className="flex flex-col gap-[10px] md:gap-[15px]">
            <span className="font-semibolds text-[18px] ">내 후기</span>

            <div className="row-center justify-between">
                {/* 평점 */}
                <Rating rating={userRating.rating} sizeType="ratingSection" />

                {/* 작성 날짜 */}
                <span className="text-font-secondary text-[12px] md:text-[14px]">
                    {displayDate}
                </span>
            </div>

            <p className="text-font-secondary text-[15px] md:text-[16px]">
                {userRating.content}
            </p>

            <div className="w-full row-center gap-[15px] md:gap-[20px] justify-end">
                <button
                    onClick={() => {}}
                    className="font-semibold text-[14px] w-fit"
                >
                    수정
                </button>
                <button
                    onClick={() => {}}
                    className="font-semibold text-[14px] w-fit"
                >
                    삭제
                </button>
            </div>
        </div>
    );
}

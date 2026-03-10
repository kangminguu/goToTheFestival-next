"use client";

export default function ScrollToRatingSectionButton({ reviewCount }: any) {
    // 후기 섹션으로 스크롤 이동 이벤트
    const handleMoveScrollToRating = () => {
        document.getElementById("rating-section").scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={handleMoveScrollToRating}
            className="row-center gap-[5px] text-font-secondary text-[14px] md:text-[16px]"
        >
            {reviewCount === 0 ? "후기가 없습니다" : `${reviewCount}개 평가`}
            <img
                src="/assets/arrow/arrow_gray.svg"
                alt="rating"
                className=" rotate-180 w-[14px] md:w-[16px]"
            />
        </button>
    );
}

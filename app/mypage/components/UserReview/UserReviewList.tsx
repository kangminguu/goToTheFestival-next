"use client";

import { useState } from "react";
import UserReview from "./UserReview";

export default function UserReviewList({ userReviews }) {
    const [page, setPage] = useState(3);
    const [showReviews, setShowReviews] = useState(userReviews.slice(0, 3));

    // 더보기 버튼 클릭 이벤트
    const handleShowMoreReview = () => {
        const nextPage = page + 3;

        setShowReviews(userReviews.slice(0, nextPage));
        setPage(nextPage);
    };

    if (userReviews.length === 0) {
        return (
            <div className="text-font-secondary text-[14px] md:text-[16px]">
                작성한 후기가 없습니다.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[20px]">
            {userReviews.length !== 0
                ? showReviews.map((review, index) => {
                      return <UserReview key={index} review={review} />;
                  })
                : null}

            {showReviews.length === userReviews.length ? null : (
                <div className="w-full col-center mt-[20px]">
                    <button
                        onClick={handleShowMoreReview}
                        className="font-semibold text-[14px] w-fit"
                    >
                        더보기
                    </button>
                </div>
            )}
        </div>
    );
}

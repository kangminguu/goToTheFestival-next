"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../../lib/utils/client";
import Button from "../../../../components/Button/Button";
import Rating from "../../../../components/Rating/Rating";
import RatingSectionReview from "./RatingSectionReview";

export default function DetailRatingSection({
    contentId,
    avgRating,
    ratingCount,
    reviews,
}: {
    contentId: string;
    avgRating: number;
    ratingCount: number;
    reviews: any;
}) {
    // const [rating, setRating] = useState(5);
    // const [content, setContent] = useState("");
    // const [error, setError] = useState<string | null>(null);

    // async function handleSubmit(e: React.FormEvent) {
    //     e.preventDefault();
    //     setError(null);

    //     const supabase = createClient();
    //     const {
    //         data: { user },
    //     } = await supabase.auth.getUser();

    //     const { data, error } = await supabase.from("reviews").insert([
    //         {
    //             festival_id: contentId,
    //             user_id: user.id,
    //             rating,
    //             content,
    //         },
    //     ]);

    //     if (error) {
    //         setError(error.message);
    //         return;
    //     }

    //     alert("후기가 성공적으로 등록되었습니다!");
    //     setRating(5);
    //     setContent("");
    // }

    const [page, setPage] = useState(3);
    const [showReviews, setShowReviews] = useState(reviews.slice(0, 3));

    const handleShowMoreReview = () => {
        const nextPage = page + 3;

        setShowReviews(reviews.slice(0, nextPage));
        setPage(nextPage);
    };

    return (
        <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px]">
            <div className="row-center justify-between">
                <h2 className="md:text-[24px] text-[16px] font-semibold">
                    축제 후기
                </h2>

                <Button title="후기 작성" icon="/assets/review.svg" />
            </div>

            <div className="row-center gap-[10px]">
                <Rating sizeType="rating" rating={avgRating} />
                <span className=" text-center text-font-secondary text-[14px]">
                    {ratingCount === 0
                        ? "후기가 없습니다"
                        : `${ratingCount}개 평가`}
                </span>
            </div>

            {/* 축제 후기 */}
            <div className="flex flex-col gap-[20px]">
                {reviews.length !== 0
                    ? showReviews.map((review, index) => {
                          return (
                              <RatingSectionReview
                                  key={index}
                                  userName={review.user_name}
                                  rating={review.rating}
                                  content={review.content}
                                  created_at={review.created_at}
                              />
                          );
                      })
                    : null}

                {showReviews.length === reviews.length ? null : (
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

            {/* <form onSubmit={handleSubmit}>
                <label>
                    별점:
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                                {n}점
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    후기 내용:
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        required
                    />
                </label>

                {error && <p className="text-red-600">{error}</p>}

                <button type="submit">후기 등록</button>
            </form> */}
        </div>
    );
}

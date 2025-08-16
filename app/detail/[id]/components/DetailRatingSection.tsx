"use client";

import { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import Rating from "../../../../components/Rating/Rating";
import RatingSectionReview from "./RatingSectionReview";
import { useWriteReviewModalStore } from "../../../../stores/useWriteReviewModalStore";
import { useAlertStore } from "../../../../stores/useAlertStore";
import { createClient } from "../../../../lib/utils/client";
import { useRouter } from "next/navigation";
import { useModalStore } from "../../../../stores/useModalStore";

export default function DetailRatingSection({
    contentId,
    title,
    avgRating,
    ratingCount,
    reviews,
}: {
    contentId: string;
    title: string;
    avgRating: number;
    ratingCount: number;
    reviews: any;
}) {
    const router = useRouter();
    const { open: writeModalOpen, close: writeModalClose } =
        useWriteReviewModalStore();
    const { open: alertOpen, close: alertClose } = useAlertStore();
    const { open: modalOpen, close: modalClose } = useModalStore();

    // 보여줄 리뷰 수
    const [page, setPage] = useState(3);
    const [showReviews, setShowReviews] = useState(reviews.slice(0, page));

    // 사용자 여부(로그인 여부)
    const [user, setUser] = useState(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };

        fetchUser();
    }, []);

    useEffect(() => {
        setShowReviews(reviews ? reviews.slice(0, page) : []);
    }, [reviews, page]);

    const handleShowMoreReview = () => {
        const nextPage = page + 3;

        setShowReviews(reviews.slice(0, nextPage));
        setPage(nextPage);
    };

    const writeReview = async (rating: number, content: string) => {
        const { error } = await supabase.from("reviews").insert([
            {
                festival_id: contentId,
                user_id: user.id,
                rating,
                content,
            },
        ]);

        return error;
    };

    const handleWriteReview = () => {
        alertClose();

        if (user) {
            // 로그인 한 경우
            writeModalOpen(title, contentId, async (rating, content) => {
                // 축제 후기 작성
                const error = await writeReview(rating, content);

                writeModalClose();

                router.refresh();

                if (!error) {
                    alertOpen("후기가 성공적으로 등록되었습니다.");
                } else {
                    alertOpen(
                        "후기 등록에 실패하였습니다. 잠시 후 다시 시도해주세요."
                    );
                }
            });
        } else {
            // 로그인 하지 않은 경우
            modalOpen(
                "후기 작성",
                "후기 작성은 로그인이 필요한 서비스입니다.",
                "로그인 하기",
                () => {
                    modalClose();
                    router.push("/login"); // 로그인 페이지로 이동
                }
            );
        }
    };

    return (
        <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px]">
            <div className="row-center justify-between">
                <h2 className="md:text-[24px] text-[16px] font-semibold">
                    축제 후기
                </h2>

                {/* 후기 작성 버튼 */}
                <Button
                    onClick={handleWriteReview}
                    title="후기 작성"
                    icon="/assets/review.svg"
                />
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
        </div>
    );
}

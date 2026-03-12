"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button/Button";
import Rating from "@/components/Rating/Rating";
import RatingSectionReview from "./RatingSectionReview";
import { useWriteReviewModalStore } from "@/stores/useWriteReviewModalStore";
import { useAlertStore } from "@/stores/useAlertStore";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/stores/useModalStore";
import MyRating from "./MyRating";
import {
    DetailRatingSectionProps,
    FestivalReview,
} from "@/features/festival/review/model/types";
import { useFestivalReviewsQuery } from "@/features/festival/review/hooks/useFestivalReviewsQuery";
import { useCreateFestivalReview } from "@/features/festival/review/hooks/useCreateFestivalReview";
import DetailRatingLoading from "./DetailRatingLoading";
import DetailRatingError from "./DetailRatingError";
import { RateReviewIcon } from "@/components/Icons";

export default function DetailRatingSection({
    contentId,
    title,
    avgRating,
    reviewCount,
}: DetailRatingSectionProps) {
    const router = useRouter();

    const { open: writeModalOpen, close: writeModalClose } =
        useWriteReviewModalStore();
    const { open: alertOpen, close: alertClose } = useAlertStore();
    const { open: modalOpen, close: modalClose } = useModalStore();

    // 보여줄 리뷰 수
    const [page, setPage] = useState(3);

    const { data, isLoading, isError } = useFestivalReviewsQuery(contentId);
    const createReviewMutation = useCreateFestivalReview(contentId);

    const reviews = data?.reviews ?? [];
    const userRating = data?.myReview ?? null;
    const isLogin = data?.isLogin ?? false;

    const showReviews = useMemo(() => reviews.slice(0, page), [reviews, page]);

    useEffect(() => {
        setPage(3);
    }, [contentId]);

    const handleShowMoreReview = () => {
        setPage((prev) => prev + 3);
    };

    const handleWriteReview = () => {
        alertClose();

        if (!isLogin) {
            modalOpen(
                "후기 작성",
                "후기 작성은 로그인이 필요한 서비스입니다.",
                "로그인 하기",
                () => {
                    modalClose();
                    router.push("/login");
                },
            );
            return;
        }

        writeModalOpen(title, contentId, async (rating, content) => {
            const result = await createReviewMutation.mutateAsync({
                rating,
                content,
            });

            writeModalClose();

            if (result.ok) {
                alertOpen("후기가 성공적으로 등록되었습니다.");
                router.refresh();
            } else {
                alertOpen(
                    "후기 등록에 실패하였습니다. 잠시 후 다시 시도해주세요.",
                );
            }
        });
    };

    if (isLoading) {
        return <DetailRatingLoading />;
    }

    if (isError) {
        return <DetailRatingError />;
    }

    return (
        <div
            id="rating-section"
            className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px]"
        >
            <div className="row-center justify-between">
                <h2 className="md:text-[24px] text-[16px] font-semibold">
                    축제 후기
                </h2>

                {!userRating ? (
                    <Button onClick={handleWriteReview}>
                        <RateReviewIcon size={16} />
                        후기 작성
                    </Button>
                ) : null}
            </div>

            <div className="row-center gap-[10px]">
                <Rating sizeType="rating" rating={avgRating} />
                <span className=" text-center text-font-secondary text-[14px]">
                    {reviewCount === 0
                        ? "후기가 없습니다"
                        : `${reviewCount}개 평가`}
                </span>
            </div>

            {userRating ? (
                <MyRating userRating={userRating} title={title} />
            ) : null}

            {/* 축제 후기 */}
            <div className="flex flex-col gap-[20px]">
                {reviews.length !== 0
                    ? showReviews.map(
                          (review: FestivalReview, index: number) => {
                              return (
                                  <RatingSectionReview
                                      key={index}
                                      userName={review.user_name}
                                      rating={review.rating}
                                      content={review.content}
                                      created_at={review.created_at}
                                  />
                              );
                          },
                      )
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

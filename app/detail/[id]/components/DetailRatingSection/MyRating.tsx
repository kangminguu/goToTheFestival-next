import Rating from "../../../../../components/Rating/Rating";
import {
    convertToDotDateFormat,
    convertStringDateToDate,
    getToday,
} from "../../../../../lib/utils";
import getDifferenceDates from "../../../../../lib/utils/date/getDifferenceDates";
import { useModalStore } from "../../../../../stores/useModalStore";
import { useAlertStore } from "../../../../../stores/useAlertStore";
import { useWriteReviewModalStore } from "../../../../../stores/useWriteReviewModalStore";
import { useUpdateFestivalReview } from "@/features/festival/rating/hooks/useUpdateFestivalReview";
import { useDeleteFestivalReview } from "@/features/festival/rating/hooks/useDeleteFestivalReview";

export default function MyRating({ userRating, title }: any) {
    const { open: modalOpen, close: modalClose } = useModalStore();
    const { open: alertOpen, close: alertClose } = useAlertStore();
    const { open: writeModalOpen, close: writeModalClose } =
        useWriteReviewModalStore();

    const updateReviewMutation = useUpdateFestivalReview(
        userRating.festival_id,
    );
    const deleteReviewMutation = useDeleteFestivalReview(
        userRating.festival_id,
    );

    // 오늘
    const today = convertStringDateToDate(getToday());
    // 작성일
    const createdDate = convertStringDateToDate(
        userRating.created_at.split("T")[0].split("-").join(""),
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
            userRating.created_at.split("T")[0].split("-").join(""),
        );
    }

    // 후기 삭제
    const handleDelete = () => {
        alertClose();

        modalOpen(
            "후기 삭제",
            `작성하신 ${title}의 후기를 삭제합니다.\n삭제된 후기는 복구가 불가능해요.\n정말로 작성하신 후기를 삭제하시겠어요?`,
            "삭제할게요",
            async () => {
                const result = await deleteReviewMutation.mutateAsync({
                    reviewId: userRating.id,
                });

                modalClose();

                if (result.status === 401) {
                    alertOpen("로그인이 필요합니다.");
                    return;
                }

                if (result.ok) {
                    alertOpen("작성하신 후기가 삭제되었습니다.");
                } else {
                    alertOpen(
                        "삭제에 실패하였습니다. 잠시 후 다시 시도해주세요.",
                    );
                }
            },
        );
    };

    const handleEditReview = () => {
        alertClose();

        writeModalOpen(
            title,
            userRating.festival_id,
            async (rating, content) => {
                const result = await updateReviewMutation.mutateAsync({
                    reviewId: userRating.id,
                    rating,
                    content,
                });

                writeModalClose();

                if (result.status === 401) {
                    alertOpen("로그인이 필요합니다.");
                    return;
                }

                if (result.ok) {
                    alertOpen("후기를 수정하였습니다.");
                } else {
                    alertOpen(
                        "후기 수정을 실패하였습니다. 잠시 후 다시 시도해주세요.",
                    );
                }
            },
            userRating.rating,
            userRating.content,
        );
    };

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
                    onClick={handleEditReview}
                    className="font-semibold text-[14px] w-fit"
                >
                    수정
                </button>
                <button
                    onClick={handleDelete}
                    className="font-semibold text-[14px] w-fit"
                >
                    삭제
                </button>
            </div>
        </div>
    );
}

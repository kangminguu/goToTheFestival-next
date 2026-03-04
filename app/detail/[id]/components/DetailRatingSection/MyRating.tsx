import { useRouter } from "next/navigation";
import Rating from "../../../../../components/Rating/Rating";
import {
    convertToDotDateFormat,
    convertStringDateToDate,
    getToday,
} from "../../../../../lib/utils";
import { createClient } from "../../../../../lib/utils/client";
import getDifferenceDates from "../../../../../lib/utils/date/getDifferenceDates";
import { useModalStore } from "../../../../../stores/useModalStore";
import { useAlertStore } from "../../../../../stores/useAlertStore";
import { useWriteReviewModalStore } from "../../../../../stores/useWriteReviewModalStore";

export default function MyRating({ userRating, setUserRating, title }: any) {
    const { open: modalOpen, close: modalClose } = useModalStore();
    const { open: alertOpen, close: alertClose } = useAlertStore();
    const { open: writeModalOpen, close: writeModalClose } =
        useWriteReviewModalStore();

    const router = useRouter();

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

    const supabase = createClient();

    // 후기 삭제
    const deleteReview = async (): Promise<any> => {
        const { error } = await supabase.from("reviews").delete().match({
            festival_id: userRating.festival_id,
            user_id: userRating.user_id,
        });

        return error;
    };

    // 후기 삭제
    const handleDelete = () => {
        alertClose();

        modalOpen(
            "후기 삭제",
            `작성하신 ${title}의 후기를 삭제합니다.\n삭제된 후기는 복구가 불가능해요.\n정말로 작성하신 후기를 삭제하시겠어요?`,
            "삭제할게요",
            async () => {
                const error = await deleteReview();

                modalClose();

                if (!error) {
                    setUserRating(null); // 정신 나갈거 같이 복잡해진 코드 및 클라이언트 컴포넌트에서 요청하는 바람에 네트워크 탭에 노출되어버린 모든 api 엔드포인트 노출

                    router.refresh();

                    alertOpen("작성하신 후기가 삭제되었습니다.");
                } else {
                    alertOpen(
                        "삭제에 실패하였습니다. 잠시 후 다시 시도해주세요.",
                    );
                }
            },
        );
    };

    const editReview = async (
        rating: number,
        content: string,
    ): Promise<any> => {
        const { error } = await supabase
            .from("reviews")
            .update({ rating, content })
            .eq("festival_id", userRating.festival_id)
            .eq("user_id", userRating.user_id);

        return error;
    };

    const fetchUserRating = async (): Promise<void> => {
        const { data, error } = await supabase
            .from("reviews")
            .select("*")
            .eq("festival_id", userRating.festival_id) // 특정 축제 ID
            .eq("user_id", userRating.user_id) // 특정 유저 ID
            .single(); // 하나만 가져옴

        if (error) {
            console.error("리뷰 가져오기 실패:", error);
            return;
        }

        setUserRating(data);
    };

    const handleEditReview = () => {
        alertClose();

        writeModalOpen(
            title,
            userRating.user_id,
            async (rating, content) => {
                // 축제 후기 작성
                const error = await editReview(rating, content);

                writeModalClose();

                fetchUserRating();

                router.refresh();

                if (!error) {
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

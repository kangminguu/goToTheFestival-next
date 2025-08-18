import { useRouter } from "next/navigation";
import Rating from "../../../../../components/Rating/Rating";
import {
    convertToDotDateFormat,
    convertYYYYMMDDToDate,
    getToday,
} from "../../../../../lib/utils";
import { createClient } from "../../../../../lib/utils/client";
import getDifferenceDates from "../../../../../lib/utils/getDifferenceDates";
import { useModalStore } from "../../../../../stores/useModalStore";
import { useAlertStore } from "../../../../../stores/useAlertStore";

export default function MyRating({ userRating, setUserRating, title }) {
    const { open: modalOpen, close: modalClose } = useModalStore();
    const { open: alertOpen, close: alertClose } = useAlertStore();

    const router = useRouter();

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

    const supabase = createClient();

    const deleteReview = async () => {
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
                        "삭제에 실패하였습니다. 잠시 후 다시 시도해주세요."
                    );
                }
            }
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
                    onClick={() => {}}
                    className="font-semibold text-[14px] w-fit"
                >
                    수정
                </button>
                <button
                    onClick={() => {
                        handleDelete();
                    }}
                    className="font-semibold text-[14px] w-fit"
                >
                    삭제
                </button>
            </div>
        </div>
    );
}

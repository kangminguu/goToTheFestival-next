"use client";
import Button from "../../../components/Button/Button";
import { createClient } from "../../../lib/utils/client";
import { useAlertStore } from "../../../stores/useAlertStore";
import { useModalStore } from "../../../stores/useModalStore";
import DeleteAccountButton from "./DeleteAccountButton/DeleteAccountButton";

export default function UserDeleteAccountSection({ userId }) {
    const { open: modalOpen, close: modalClose } = useModalStore();
    const { open: alertOpen, close: alertClose } = useAlertStore();

    const deleteAllReviews = async () => {
        const supabase = createClient();
        const { error } = await supabase
            .from("reviews")
            .delete()
            .eq("user_id", userId);

        if (error) {
            alertOpen("후기가 삭제되지 못했습니다.");
        }
    };

    const handleDeleteAllRating = () => {
        alertClose();

        modalOpen(
            "모든 후기 삭제",
            "작성하신 모든 후기를 삭제합니다. 삭제된 후기는 복구가 불가능해요.\n정말로 모든 후기를 삭제하시겠어요?",
            "삭제할게요",
            async () => {
                // 모든 축제 삭제
                await deleteAllReviews();

                // 모달창 닫기
                modalClose();

                // 새로고침하면서 홈으로 이동을 위해
                // window.location.href = "http://localhost:3000/mypage";
                // 다른 방식으로 상태를 업데이트하는게 필요, 페이지 안에서 전역으로 관리?

                // 알람
                alertOpen("작성하신 모든 후기가 삭제되었습니다.");
            }
        );
    };

    return (
        <>
            <div className="flex flex-col gap-[5px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px]">
                {/* 모든후기 삭제 버튼 */}
                <Button
                    onClick={handleDeleteAllRating}
                    title="모든 후기 삭제"
                />

                {/* 회원 탈퇴 버튼 */}
                <DeleteAccountButton />
            </div>
        </>
    );
}

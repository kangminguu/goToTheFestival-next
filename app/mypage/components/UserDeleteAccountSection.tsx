"use client";

import { useRouter } from "next/navigation";
import Button from "../../../components/Button/Button";
import { createClient } from "../../../lib/utils/client";
import { useAlertStore } from "../../../stores/useAlertStore";
import { useModalStore } from "../../../stores/useModalStore";
import DeleteAccountButton from "./DeleteAccountButton/DeleteAccountButton";
import { useState } from "react";

export default function UserDeleteAccountSection({ userId }) {
    const router = useRouter();
    const { open: modalOpen, close: modalClose } = useModalStore();
    const { open: alertOpen, close: alertClose } = useAlertStore();

    const [deleteError, setDeleteError] = useState(null);

    const deleteAllReviews = async () => {
        const supabase = createClient();
        const { error } = await supabase
            .from("reviews")
            .delete()
            .eq("user_id", userId);

        if (error) {
            setDeleteError(error);
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

                // 리프레시
                router.refresh();

                if (deleteError !== null) {
                    // 성공알람
                    alertOpen("작성하신 모든 후기를 삭제했습니다.");
                } else {
                    // 실패알람
                    alertOpen(
                        "후기를 삭제하지 못했습니다. 잠시 후 다시 시도해주세요."
                    );
                }
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

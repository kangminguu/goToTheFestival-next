"use client";
import Button from "../../../components/Button/Button";
import { useModalStore } from "../../../stores/useModalStore";
import DeleteAccountButton from "./DeleteAccountButton/DeleteAccountButton";

export default function UserDeleteAccountSection() {
    const { open } = useModalStore();

    const handleDeleteAllRating = () => {
        open(
            "모든 후기 삭제",
            "작성하신 모든 후기를 삭제합니다. 삭제된 후기는 복구가 불가능해요.\n정말로 모든 후기를 삭제하시겠어요?",
            "삭제할게요",
            () => {}
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

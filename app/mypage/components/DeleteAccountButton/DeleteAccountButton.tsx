"use client";
import { deleteAccount } from "./deleteAccount";
import { createClient } from "../../../../lib/utils/client";
import Button from "../../../../components/Button/Button";
import { useModalStore } from "../../../../stores/useModalStore";

export default function DeleteAccountButton() {
    const supabase = createClient();
    const { open } = useModalStore();

    async function handleDelete() {
        open(
            "회원 탈퇴",
            "탈퇴하시면 모든 정보가 삭제되어 복구가 불가해요.\n정말로 탈퇴하시겠어요?",
            "탈퇴할게요",
            async () => {
                await deleteAccount(); // 서버에서 계정 삭제
                await supabase.auth.signOut(); // 로그아웃

                // 새로고침하면서 홈으로 이동을 위해
                window.location.href = "https://gotofestival.vercel.app/";
            }
        );
    }

    return <Button title="회원 탈퇴" onClick={handleDelete} />;
}

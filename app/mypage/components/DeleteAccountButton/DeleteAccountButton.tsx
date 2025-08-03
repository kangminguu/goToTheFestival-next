"use client";
import { deleteAccount } from "./deleteAccount";
import { createClient } from "../../../../lib/utils/client";
import Button from "../../../../components/Button/Button";

export default function DeleteAccountButton() {
    const supabase = createClient();

    async function handleDelete() {
        await deleteAccount(); // 서버에서 계정 삭제
        await supabase.auth.signOut(); // 로그아웃

        // 새로고침하면서 홈으로 이동을 위해
        window.location.href = "http://localhost:3000/";
    }

    return <Button title="회원 탈퇴" onClick={handleDelete} />;
}

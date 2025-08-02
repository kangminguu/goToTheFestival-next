"use client";
import { deleteAccount } from "./deleteAccount";
import { createClient } from "../../../../lib/utils/client";
import Button from "../../../../components/Button/Button";

export default function DeleteAccountButton() {
    const supabase = createClient();

    async function handleDelete() {
        await deleteAccount(); // 서버에서 계정 삭제
        await supabase.auth.signOut(); // 로그아웃
    }

    return <Button title="회원 탈퇴" onClick={handleDelete} />;
}

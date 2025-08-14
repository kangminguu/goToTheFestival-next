"use client";
import { redirect, useRouter } from "next/navigation";
import Button from "../../../../components/Button/Button";
import { createClient } from "../../../../lib/utils/client";

export default function SignOutButton() {
    const supabase = createClient();
    const router = useRouter();

    async function handleLogout() {
        await supabase.auth.signOut();

        // 새로고침하면서 홈으로 이동을 위해
        window.location.href = "https://gotofestival.vercel.app/";
    }


    return <Button title="로그아웃" onClick={handleLogout} />;
}

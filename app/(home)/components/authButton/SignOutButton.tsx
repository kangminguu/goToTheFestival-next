"use client";
import { createClient } from "../../../../lib/utils/client";

export default function SignOutButton() {
    const supabase = createClient();

    async function handleLogout() {
        await supabase.auth.signOut();
    }

    return <button onClick={handleLogout}>로그아웃</button>;
}

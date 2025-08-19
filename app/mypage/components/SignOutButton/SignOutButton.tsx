"use client";
import Button from "../../../../components/Button/Button";
import { createClient } from "../../../../lib/utils/client";

export default function SignOutButton() {
    const supabase = createClient();

    async function handleLogout() {
        // supabse 세션 종료
        await supabase.auth.signOut();

        const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
        const LOGOUT_REDIRECT_URI = process.env.NEXT_PUBLIC_BASE_URL; // 리다이렉트 주소 : 홈으로 이동

        // 카카오에서 리다이렉트 주소 등록
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
    }

    return <Button title="로그아웃" onClick={handleLogout} />;
}

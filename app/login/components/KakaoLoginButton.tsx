"use client";

import { createClient } from "../../../lib/utils/client";

export default async function KakaoLoginButton() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const supabase = createClient();

    // 카카오 로그인
    async function signInWithKakao() {
        await supabase.auth.signInWithOAuth({
            provider: "kakao",
            options: {
                redirectTo: `${baseUrl}/auth/callback`,
            },
        });
    }

    return (
        <button
            onClick={() => signInWithKakao()}
            className="row-center gap-[10px] bg-[#FEE500] py-[10px] px-[14px] mt-[20px] rounded-[8px] text-[#181602] font-semibold text-[14px]"
        >
            <img src="/assets/kakao.svg" alt="카카오 로그인" />
            카카오로 시작하기
        </button>
    );
}

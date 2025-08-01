"use client";

import Link from "next/link";
import { createClient } from "../../lib/utils/client";

// export function generateMetadata() {
//     return {
//         title: "로그인 - 축제가자",
//     };
// }

export default function LoginPage() {
    async function signInWithKakao() {
        const supabase = await createClient();
        // const { data, error } = await supabase.auth.signInWithOAuth({
        //     provider: "kakao",
        //     options: {
        //         redirectTo: "http://localhost:3000/auth/callback",
        //     },
        // });
        await supabase.auth.signInWithOAuth({
            provider: "kakao",
            options: {
                redirectTo: "http://localhost:3000/auth/callback",
            },
        });
    }

    return (
        <div className="min-max-padding min-h-[400px] md:min-h-[600px] col-center justify-center gap-[10px]">
            <button
                onClick={() => signInWithKakao()}
                className="row-center gap-[10px] bg-[#FEE500] py-[10px] px-[14px] mt-[20px] rounded-[8px] text-[#181602] font-semibold text-[14px]"
            >
                <img src="/assets/kakao.svg" alt="카카오 로그인" />
                카카오로 시작하기
            </button>

            <Link href="/" className="mt-[20px]">
                <button className="row-center gap-[10px] font-semibold text-[14px]">
                    <img
                        src="/assets/swiper_arrow.svg"
                        alt="홈으로"
                        className="rotate-180"
                    />
                    로그인 없이 둘러보기
                </button>
            </Link>
        </div>
    );
}

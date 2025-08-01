import Link from "next/link";
import KakaoLoginButton from "./components/KakaoLoginButton";
import { createClient } from "../../lib/utils/server";
import { redirect } from "next/navigation";

export function generateMetadata() {
    return {
        title: "로그인 - 축제가자",
    };
}

export default async function LoginPage() {
    const supabase = createClient();
    const {
        data: { user },
    } = await (await supabase).auth.getUser();

    // 로그인 O 라면 마이페이지로 리다이렉션
    if (user) {
        redirect("/mypage");
    }

    return (
        <div className="min-max-padding min-h-[400px] md:min-h-[600px] col-center justify-center gap-[10px]">
            {/* 카카오 로그인 버튼 */}
            <KakaoLoginButton />
            {/* 홈으로 이동 버튼 */}
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

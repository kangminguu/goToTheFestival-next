import { redirect } from "next/navigation";
import { createClient } from "../../lib/utils/server";
import UserInfoSection from "./components/UserInfoSection";
import UserRatingSection from "./components/UserRatingSection";
import UserDeleteAccountSection from "./components/UserDeleteAccountSection";

export function generateMetadata() {
    return {
        title: "마이페이지 - 축제가자",
    };
}

export default async function Mypage() {
    const supabase = createClient();
    const {
        data: { user },
    } = await (await supabase).auth.getUser();

    // 로그인 X 라면 로그인 페이지로 리다이렉션
    if (!user) {
        redirect("/login");
    }

    // reviews 테이블에서 user_id가 맞는 후기만 가져옴
    const { data: reviews } = await (await supabase)
        .from("reviews")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
    
    const emptyReviews = [];

    return (
        <div className="min-max-padding">
            {/* 내 정보 */}
            <UserInfoSection
                name={user.user_metadata.user_name}
                email={user.user_metadata.email}
                profileImg={user.user_metadata.avatar_url}
            />

            {/* 내 후기 관리 */}
            <UserRatingSection reviews={reviews} />

            {/* 후기 전체 삭제 및 탈퇴 */}
            <UserDeleteAccountSection />
        </div>
    );
}

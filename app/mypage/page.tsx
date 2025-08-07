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

    console.log(user);

    return (
        <div className="min-max-padding">
            <UserInfoSection
                name={user.user_metadata.user_name}
                email={user.user_metadata.email}
                profileImg={user.user_metadata.avatar_url}
            />

            <UserRatingSection />

            <UserDeleteAccountSection />
        </div>
    );
}

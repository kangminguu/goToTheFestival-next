import { redirect } from "next/navigation";
import { createClient } from "../../lib/utils/server";

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

    return <div>마이페이지</div>;
}

"use server";
import { createAdminClient } from "../../../../lib/utils/admin";
import { createClient } from "../../../../lib/utils/server";

export async function deleteAccount() {
    const supabase = createClient();
    const { data: sessionData, error: sessionError } = await (
        await supabase
    ).auth.getSession();
    if (sessionError || !sessionData.session)
        throw new Error("세션을 가져올 수 없습니다.");

    const user = sessionData.session.user;
    const kakaoAccessToken = sessionData.session.provider_token; // Kakao access token

    // Kakao 앱 연결 해제
    // 다시 회원가입하는 경우 다시 동의 항목을 띄웁니다.
    if (kakaoAccessToken) {
        await fetch("https://kapi.kakao.com/v1/user/unlink", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${kakaoAccessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
    }

    const supabaseAdmin = createAdminClient(); // 관리자 권한 클라이언트 생성
    const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (error) throw error;
    return { success: true };
}

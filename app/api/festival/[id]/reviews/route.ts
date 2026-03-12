import { createClient } from "@/lib/utils/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id: contentId } = await params;

    if (!contentId) {
        return NextResponse.json(
            {
                error: "축제 ID가 필요합니다.",
            },
            { status: 400 },
        );
    }

    const supabase = await createClient();

    // 전체 후기
    const { data: reviews, error: reviewsError } = await supabase
        .from("review_with_user")
        .select("*")
        .eq("festival_id", contentId)
        .order("created_at", { ascending: false });

    if (reviewsError) {
        return NextResponse.json(
            { error: "축제 후기를 가져오는 데 실패했습니다." },
            { status: 500 },
        );
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    let myReview = null;
    // 로그인한 유저가 있다면, 해당 유저의 후기 패칭
    if (user) {
        const { data, error } = await supabase
            .from("reviews")
            .select("*")
            .eq("festival_id", contentId)
            .eq("user_id", user.id)
            .maybeSingle();

        if (!error) {
            myReview = data;
        }
    }

    return NextResponse.json({
        reviews: reviews ?? [],
        myReview,
        isLogin: !!user,
    });
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id: contentId } = await params;

    if (!contentId) {
        return NextResponse.json(
            {
                error: "축제 ID가 필요합니다.",
            },
            { status: 401 },
        );
    }

    const body = await request.json();
    const rating = Number(body?.rating);
    const content = (body?.content ?? "").trim();

    // if (![1, 2, 3, 4, 5].includes(rating) || !content) {
    //     return NextResponse.json(
    //         { error: "유효하지 않은 요청입니다." },
    //         { status: 400 },
    //     );
    // }

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json(
            { error: "로그인이 필요합니다." },
            { status: 401 },
        );
    }

    const { error } = await supabase.from("reviews").insert({
        festival_id: contentId,
        user_id: user.id,
        rating,
        content,
    });

    if (error) {
        return NextResponse.json(
            { error: "후기 등록에 실패했습니다." },
            { status: 500 },
        );
    }

    return NextResponse.json({ ok: true });
}

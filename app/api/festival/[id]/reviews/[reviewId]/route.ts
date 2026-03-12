import { createClient } from "@/lib/utils/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; reviewId: string }> },
) {
    const { id: contentId, reviewId } = await params;
    const { rating, content } = await request.json();

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

    const { error } = await supabase
        .from("reviews")
        .update({ rating: Number(rating), content: content.trim() })
        .eq("id", reviewId)
        .eq("festival_id", contentId)
        .eq("user_id", user.id); // 본인 리뷰만 수정

    if (error) {
        return NextResponse.json(
            { error: "후기 수정에 실패했습니다." },
            { status: 500 },
        );
    }

    return NextResponse.json({ ok: true });
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string; reviewId: string }> },
) {
    const { id: contentId, reviewId } = await params;

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

    const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId)
        .eq("festival_id", contentId)
        .eq("user_id", user.id);

    if (error) {
        return NextResponse.json(
            { error: "후기 삭제에 실패했습니다." },
            { status: 500 },
        );
    }

    return NextResponse.json({ ok: true });
}

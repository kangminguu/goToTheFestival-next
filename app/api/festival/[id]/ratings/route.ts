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

    // 축제 평균 점수, 후기 개수
    const { data: ratingData, error: ratingError } = await supabase
        .from("festival_ratings")
        .select("avg_rating, review_count")
        .eq("festival_id", contentId)
        .maybeSingle();

    if (ratingError) {
        return NextResponse.json(
            {
                error: "리뷰 데이터를 가져오는 데 실패했습니다.",
            },
            { status: 500 },
        );
    }

    return NextResponse.json({
        avgRating: ratingData?.avg_rating ?? 0,
        reviewCount: ratingData?.review_count ?? 0,
    });
}

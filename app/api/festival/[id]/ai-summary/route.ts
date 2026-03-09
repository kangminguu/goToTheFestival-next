import { NextRequest, NextResponse } from "next/server";
import getAISummary from "../../../../../features/festival/ai-summary/api/getAISummary";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const body = await request.json();
    const festivalInfo = body?.festivalInfo;

    if (!id || !festivalInfo?.title) {
        return NextResponse.json({ error: "invalid request" }, { status: 400 });
    }

    const result = await getAISummary(id, festivalInfo);

    if (!result) {
        return NextResponse.json(
            { error: "Failed to get AI summary" },
            { status: 500 },
        );
    }

    return NextResponse.json(result);
}

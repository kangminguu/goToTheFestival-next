import { NextResponse } from "next/server";
import getFestivalList from "../../../lib/api/festival/getFestivalList";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const pageNo = Number(searchParams.get("pageNo") ?? "1");
    const numOfRows = Number(searchParams.get("numOfRows") ?? "8");
    const eventStartDate = searchParams.get("eventStartDate") ?? "";
    const eventEndDate = searchParams.get("eventEndDate") ?? "";
    const keyword = searchParams.get("keyword") ?? "";
    const areaCode = searchParams.get("areaCode") ?? "";

    const festivalData = await getFestivalList({
        pageNo,
        numOfRows,
        eventStartDate,
        eventEndDate,
        keyword,
        areaCode,
    });

    return NextResponse.json(festivalData);
}

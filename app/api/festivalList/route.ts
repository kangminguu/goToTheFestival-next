import { NextResponse } from "next/server";
import { getFestivalListFromDB } from "../../../lib/api/festival/getFestivalListFromDB";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const eventStartDate = searchParams.get("eventStartDate") ?? "2010-01-01";
    const eventEndDate = searchParams.get("eventEndDate") ?? "2050-12-31";
    const keyword = searchParams.get("keyword") ?? "";
    const regionCode = searchParams.get("areaCode") ?? "";
    const sortBy =
        (searchParams.get("sortBy") as "date" | "distance" | "review_count") ??
        "date";
    const limit = Number(searchParams.get("limit") ?? "12");
    const offset = Number(searchParams.get("offset") ?? "0");

    const contentIdsParam = searchParams.get("contentIds") ?? "";
    const contentIds = contentIdsParam
        ? contentIdsParam
              .split(",")
              .map((id) => id.trim())
              .filter(Boolean)
        : undefined;

    // 거리순 정렬 시 위치 정보
    const userLat = searchParams.get("userLat")
        ? parseFloat(searchParams.get("userLat")!)
        : undefined;
    const userLng = searchParams.get("userLng")
        ? parseFloat(searchParams.get("userLng")!)
        : undefined;

    const festivalList = await getFestivalListFromDB({
        sortBy,
        userLat,
        userLng,
        limit,
        offset,
        regionCode: regionCode !== "0" ? regionCode : undefined,
        eventStartDate,
        eventEndDate,
        keyword: keyword ? keyword : undefined,
        contentIds,
    });

    return NextResponse.json({
        festivalList: festivalList || [],
    });
}

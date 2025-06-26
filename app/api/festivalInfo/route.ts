import { NextResponse } from "next/server";
import {
    getFestivalCommon,
    getFestivalIntroduction,
} from "../../../lib/api/festival";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get("contentid") ?? "";

    const festivalCommon = await getFestivalCommon(contentId);
    const festivalIntroduction = await getFestivalIntroduction(contentId);

    const festivalCardInfo = {
        contentid: festivalCommon.contentid,
        firstimage: festivalCommon.firstimage,
        firstimage2: festivalCommon.firstimage2,
        title: festivalCommon.title,
        eventstartdate: festivalIntroduction.eventstartdate,
        eventenddate: festivalIntroduction.eventenddate,
        addr1: festivalCommon.addr1,
        mapx: festivalCommon.mapx,
        mapy: festivalCommon.mapy,
    };

    return NextResponse.json(festivalCardInfo);
}

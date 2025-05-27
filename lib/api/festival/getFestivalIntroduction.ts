/**
 * 축제 소개정보 api 호출 함수
 * @param contentid 축제 contentid
 * @returns introduction : 종료일, 축제 장소, 시작일, 개장 시간, 스폰서1, 스폰서2, 비용
 */
export default async function getFestivalIntroduction(contentid: string) {
    const url = new URL("detailIntro2", process.env.TourAPI_BASE_URL);
    url.searchParams.set(
        "serviceKey",
        decodeURIComponent(process.env.TourAPI_KEY)
    );
    url.searchParams.set("MobileOS", "ETC");
    url.searchParams.set("MobileApp", "AppTest");
    url.searchParams.set("_type", "json");
    url.searchParams.set("contentId", contentid);
    url.searchParams.set("contentTypeId", "15");

    const res = await fetch(url.toString());
    const data = await res.json();

    const introduction = data.response.body.items.item[0];

    return introduction;
}

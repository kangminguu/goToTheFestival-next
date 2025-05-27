/**
 * 축제 공통정보 api 호출 함수
 * @param contentid 축제 contentid
 * @returns commonInfo : 축제 이름, 전화번호, 홈페이지, 대표이미지, 주소, 좌표값, 소개1
 */
export default async function getFestivalCommon(contentid: string) {
    const url = new URL("detailCommon2", process.env.TourAPI_BASE_URL);
    url.searchParams.set(
        "serviceKey",
        decodeURIComponent(process.env.TourAPI_KEY)
    );
    url.searchParams.set("MobileOS", "ETC");
    url.searchParams.set("MobileApp", "AppTest");
    url.searchParams.set("_type", "json");
    url.searchParams.set("contentId", contentid);

    const res = await fetch(url.toString());
    const data = await res.json();

    const commonInfo = data.response.body.items.item[0];

    return commonInfo;
}

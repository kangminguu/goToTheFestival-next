/**
 * 축제 반복정보 api 호출 함수
 * @param contentid 축제 contentid
 * @returns contents : 설명1, 설명2
 */
export default async function getFestivalContents(contentid: string) {
    const url = new URL("detailInfo2", process.env.TourAPI_BASE_URL);
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

    const contents = data.response.body.items.item;

    return contents;
}

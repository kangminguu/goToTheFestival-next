/**
 * 축제 이미지 리스트 api 호출 함수
 * @param contentid 축제 contentid
 * @returns imageList : 축제 이미지 리스트
 */
export default async function getFestvalImage(contentid: string) {
    const url = new URL("detailImage2", process.env.TourAPI_BASE_URL);
    url.searchParams.set("serviceKey", decodeURIComponent(process.env.TourAPI_KEY));
    url.searchParams.set("MobileOS", "ETC");
    url.searchParams.set("MobileApp", "AppTest");
    url.searchParams.set("_type", "json");
    url.searchParams.set("pageNo", "1");
    url.searchParams.set("numOfRows", "100");
    url.searchParams.set("imageYN", "Y");
    url.searchParams.set("contentId", contentid);

    const res = await fetch(url.toString());
    const data = await res.json();

    const imageList = data.response.body.items.item;

    return imageList;
}

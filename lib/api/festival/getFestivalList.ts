interface GetFestivalListParams {
    pageNo: number;
    numOfRows: number;
    eventStartDate: string;
    eventEndDate: string;
    keyword?: string;
    areaCode?: number;
}

/**
 * 행사정보조회 api 호출 함수
 * @param pageNo 페이지 넘버
 * @param numOfRows 한 페이지에 축제 수
 * @param eventStartDate 축제 시작일
 * @param eventEndDate 축제 종료일
 * @param keyword 검색 키워드
 * @param areaCode 지역 코드
 * @returns festival : 축제 리스트, 축제 개수
 */
export async function getFestvalList(params: GetFestivalListParams) {
    const url = new URL("searchFestival2", process.env.TourAPI_BASE_URL);
    url.searchParams.set("serviceKey", decodeURIComponent(process.env.TourAPI_KEY));
    url.searchParams.set("MobileOS", "ETC");
    url.searchParams.set("MobileApp", "AppTest");
    url.searchParams.set("_type", "json");
    url.searchParams.set("pageNo", String(params.pageNo));
    url.searchParams.set("numOfRows", String(params.numOfRows));
    url.searchParams.set("eventStartDate", String(params.eventStartDate));
    url.searchParams.set("eventEndDate", String(params.eventEndDate));
    if (params.areaCode)
        url.searchParams.set("areaCode", String(params.areaCode));

    const res = await fetch(url.toString());
    const data = await res.json();

    const festival = {
        festivalList: data.response.body.items.item, // 축제 리스트
        totalCount: data.response.body.totalCount, // 축제 개수
    };

    // 키워드가 주어지면 필터링
    if (params.keyword) {
        festival.festivalList = festival.festivalList.filter(
            (item: { title: string }) => item.title.includes(params.keyword)
        );

        festival.totalCount = festival.festivalList.length; // 키워드 필터링 후 축제 개수
    }

    return festival;
}

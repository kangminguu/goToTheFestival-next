interface GetFestivalListParams {
    pageNo: number;
    numOfRows: number;
    eventStartDate: string;
    eventEndDate: string;
    keyword?: string;
    areaCode?: string;
    arrange?: string;
}

/**
 * 행사정보조회 api 호출 함수
 * @param pageNo 페이지 넘버
 * @param numOfRows 한 페이지에 축제 수
 * @param eventStartDate 축제 시작일
 * @param eventEndDate 축제 종료일
 * @param keyword 검색 키워드
 * @param areaCode 지역 코드
 * @param arrange 정렬 구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
 * @returns festival : 축제 리스트, 축제 개수
 */
export default async function getFestivalList(params: GetFestivalListParams) {
    const url = new URL("searchFestival2", process.env.TourAPI_BASE_URL);
    url.searchParams.set(
        "serviceKey",
        decodeURIComponent(process.env.TourAPI_KEY)
    );
    url.searchParams.set("MobileOS", "ETC");
    url.searchParams.set("MobileApp", "AppTest");
    url.searchParams.set("_type", "json");
    url.searchParams.set("pageNo", String(params.pageNo));
    url.searchParams.set("numOfRows", String(params.numOfRows));
    url.searchParams.set("eventStartDate", String(params.eventStartDate));
    url.searchParams.set("eventEndDate", String(params.eventEndDate));
    url.searchParams.set("arrange", String(params.arrange));
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

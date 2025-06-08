import { Suspense } from "react";

import Banner from "./components/Banner/Banner";
import RegionSelector from "./components/RegionSelector/RegionSelector";
import DateSelector from "./components/DateSelector/DateSelector";
import SearchBar from "./components/SearchBar/SearchBar";
import FestivalCard from "../../components/MiniFestivalCard/FestivalCard";

export function generateMetadata() {
    return {
        title: "축제가자",
        description:
            "전국 방방곡곡에서 열리는 특별한 축제를 소개합니다. 지역별, 일정별로 쉽게 확인하고 나만의 축제 계획을 세워보세요!",
    };
}

export default async function Page() {
    // const today = getToday(); // 오늘 YYYYMMDD
    // const lastDate = getLastDayOfMonth(); // 이번 달 마지막일 YYYYMMDD
    // const { festivalList } = await getFestivalList({
    //     pageNo: 1,
    //     numOfRows: 6,
    //     eventStartDate: today,
    //     eventEndDate: lastDate,
    // });

    return (
        <>
            <Suspense fallback={<div>Loading banner...</div>}>
                <Banner festivalList={festivalList} />
            </Suspense>

            <div className="min-max-padding">
                <div className="md:mt-[40px] mt-[30px]">
                    <RegionSelector />
                </div>

                <div className="md:mt-[40px] mt-[30px] flex flex-col md:flex-row gap-[20px]">
                    <DateSelector />
                    <SearchBar />
                </div>

                <div className="mt-[80px] flex flex-col gap-[15px]">
                    <span>날짜순 | 거리순</span>
                    <div className="w-full flex flex-wrap gap-[10px] lg:grid lg:grid-cols-4 md:grid md:grid-cols-3">
                        <FestivalCard festival={festivalList[0]} />
                        <FestivalCard festival={festivalList[1]} />
                        <FestivalCard festival={festivalList[2]} />
                        <FestivalCard festival={festivalList[3]} />
                        <FestivalCard festival={festivalList[3]} />
                        <FestivalCard festival={festivalList[3]} />
                        <FestivalCard festival={festivalList[3]} />
                    </div>
                </div>
            </div>
        </>
    );
}

const festivalList = [
    {
        addr1: "경기도 평택시 팽성읍 안정쇼핑로 11",
        addr2: "안정리 예술인광장",
        zipcode: "17982",
        cat1: "A02",
        cat2: "A0207",
        cat3: "A02070200",
        contentid: "1841539",
        contenttypeid: "15",
        createdtime: "20130902221009",
        eventstartdate: "20250628",
        eventenddate: "20250628",
        firstimage:
            "http://tong.visitkorea.or.kr/cms/resource/38/3495438_image2_1.jpg",
        firstimage2:
            "http://tong.visitkorea.or.kr/cms/resource/38/3495438_image3_1.jpg",
        cpyrhtDivCd: "Type3",
        mapx: "127.0441570141",
        mapy: "36.9596645817",
        mlevel: "6",
        modifiedtime: "20250604175427",
        areacode: "31",
        sigungucode: "28",
        tel: "070-8874-3037",
        title: "마토예술제",
        lDongRegnCd: "41",
        lDongSignguCd: "220",
        lclsSystm1: "EV",
        lclsSystm2: "EV01",
        lclsSystm3: "EV010200",
        progresstype: "선택안함",
        festivaltype: "선택안함",
    },
    {
        addr1: "제주특별자치도 서귀포시 서호중로 31-22 (서호동)",
        addr2: "",
        zipcode: "63568",
        cat1: "A02",
        cat2: "A0208",
        cat3: "A02081300",
        contentid: "3495437",
        contenttypeid: "15",
        createdtime: "20250604174441",
        eventstartdate: "20250430",
        eventenddate: "20251102",
        firstimage:
            "http://tong.visitkorea.or.kr/cms/resource/33/3495433_image2_1.png",
        firstimage2:
            "http://tong.visitkorea.or.kr/cms/resource/33/3495433_image3_1.png",
        cpyrhtDivCd: "Type3",
        mapx: "126.5167986596",
        mapy: "33.2564571340",
        mlevel: "6",
        modifiedtime: "20250604174453",
        areacode: "39",
        sigungucode: "3",
        tel: "010-2672-9215",
        title: "2025 문화가 있는날 구석구석 문화배달",
        lDongRegnCd: "50",
        lDongSignguCd: "130",
        lclsSystm1: "EV",
        lclsSystm2: "EV03",
        lclsSystm3: "EV030400",
        progresstype: "선택안함",
        festivaltype: "선택안함",
    },
    {
        addr1: "서울특별시 성북구 동소문동2가",
        addr2: "130-2",
        zipcode: "02860",
        cat1: "A02",
        cat2: "A0208",
        cat3: "A02081300",
        contentid: "3495416",
        contenttypeid: "15",
        createdtime: "20250604173245",
        eventstartdate: "20250614",
        eventenddate: "20250614",
        firstimage:
            "http://tong.visitkorea.or.kr/cms/resource/15/3495415_image2_1.png",
        firstimage2:
            "http://tong.visitkorea.or.kr/cms/resource/15/3495415_image3_1.png",
        cpyrhtDivCd: "Type3",
        mapx: "127.0067150561",
        mapy: "37.5882522289",
        mlevel: "6",
        modifiedtime: "20250604173255",
        areacode: "1",
        sigungucode: "17",
        tel: "02-927-9501",
        title: "성북 MOA 마켓",
        lDongRegnCd: "11",
        lDongSignguCd: "290",
        lclsSystm1: "EV",
        lclsSystm2: "EV03",
        lclsSystm3: "EV030400",
        progresstype: "선택안함",
        festivaltype: "선택안함",
    },
    {
        addr1: "대구광역시 달성군 유가읍 테크노대로6길 20",
        addr2: "국립대구과학관",
        zipcode: "43023",
        cat1: "A02",
        cat2: "A0207",
        cat3: "A02070200",
        contentid: "3301281",
        contenttypeid: "15",
        createdtime: "20240514105040",
        eventstartdate: "20250531",
        eventenddate: "20250601",
        firstimage:
            "http://tong.visitkorea.or.kr/cms/resource/05/3495405_image2_1.JPG",
        firstimage2:
            "http://tong.visitkorea.or.kr/cms/resource/05/3495405_image3_1.JPG",
        cpyrhtDivCd: "Type3",
        mapx: "128.4664457762",
        mapy: "35.6862439572",
        mlevel: "6",
        modifiedtime: "20250604171433",
        areacode: "4",
        sigungucode: "3",
        tel: "053-668-4245",
        title: "YES! 키즈존",
        lDongRegnCd: "27",
        lDongSignguCd: "710",
        lclsSystm1: "EV",
        lclsSystm2: "EV01",
        lclsSystm3: "EV010600",
        progresstype: "",
        festivaltype: "",
    },
    {
        addr1: "부산광역시 영도구 해양로301번길 55 (동삼동)",
        addr2: "",
        zipcode: "49111",
        cat1: "A02",
        cat2: "A0208",
        cat3: "A02081300",
        contentid: "3495410",
        contenttypeid: "15",
        createdtime: "20250604171218",
        eventstartdate: "20250614",
        eventenddate: "20250614",
        firstimage:
            "http://tong.visitkorea.or.kr/cms/resource/09/3495409_image2_1.png",
        firstimage2:
            "http://tong.visitkorea.or.kr/cms/resource/09/3495409_image3_1.png",
        cpyrhtDivCd: "Type3",
        mapx: "129.0819836173",
        mapy: "35.0772042891",
        mlevel: "6",
        modifiedtime: "20250604171230",
        areacode: "6",
        sigungucode: "14",
        tel: "070-4156-2526",
        title: "제2회 선원의날 한마음 걷기축제",
        lDongRegnCd: "26",
        lDongSignguCd: "200",
        lclsSystm1: "EV",
        lclsSystm2: "EV03",
        lclsSystm3: "EV030400",
        progresstype: "선택안함",
        festivaltype: "선택안함",
    },
    {
        addr1: "대구광역시 수성구 두산동",
        addr2: "512",
        zipcode: "42175",
        cat1: "A02",
        cat2: "A0207",
        cat3: "A02070200",
        contentid: "2826992",
        contenttypeid: "15",
        createdtime: "20220707172915",
        eventstartdate: "20250620",
        eventenddate: "20250621",
        firstimage:
            "http://tong.visitkorea.or.kr/cms/resource/28/3485728_image2_1.jpg",
        firstimage2:
            "http://tong.visitkorea.or.kr/cms/resource/28/3485728_image3_1.jpg",
        cpyrhtDivCd: "Type3",
        mapx: "128.6184867738",
        mapy: "35.8294194470",
        mlevel: "6",
        modifiedtime: "20250604164648",
        areacode: "4",
        sigungucode: "7",
        tel: "053-763-1908",
        title: "대구데이 페스티벌",
        lDongRegnCd: "27",
        lDongSignguCd: "260",
        lclsSystm1: "EV",
        lclsSystm2: "EV01",
        lclsSystm3: "EV010600",
        progresstype: "선택안함",
        festivaltype: "선택안함",
    },
];

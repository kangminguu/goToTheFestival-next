import { Suspense } from "react";

import Banner from "./components/Banner/Banner";
import RegionSelector from "./components/RegionSelector/RegionSelector";
import DateSelector from "./components/DateSelector/DateSelector";
import SearchBar from "./components/SearchBar/SearchBar";
import FestivalCardList from "../../components/FestivalCardList/FestivalCardList";
import BackToTopButton from "../../components/BackToTopButton/BackToTopButton";
import { getBannerFestivalListFromDB } from "../../lib/api/festival/getFestivalListFromDB";

export function generateMetadata() {
    return {
        title: "축제가자",
        description:
            "전국 방방곡곡에서 열리는 특별한 축제를 소개합니다. 지역별, 일정별로 쉽게 확인하고 나만의 축제 계획을 세워보세요!",
        openGraph: {
            title: "축제가자",
            description:
                "전국 방방곡곡에서 열리는 특별한 축제를 소개합니다. 지역별, 일정별로 쉽게 확인하고 나만의 축제 계획을 세워보세요!",
            url: "https://www.gotothefestival.co.kr",
            siteName: "축제가자",
            images: [
                {
                    url: "https://www.gotothefestival.co.kr/gotothefestival.png", // ← 원하는 대표 이미지
                    width: 1200,
                    height: 630,
                },
            ],
            locale: "ko_KR",
            type: "website",
        },
    };
}

export default async function Page() {
    // 이번 달
    const currentMonth = new Date().getMonth() + 1;

    // 배너용 축제 리스트 가져오기
    const festivalList =
        (await getBannerFestivalListFromDB({
            month: new Date().getMonth() + 1,
            limit: 6,
        })) || []; // 축제가 없는 경우 빈 배열 반환 -> 임시, 나중에 no_festival_banner 컴포넌트로 대체 필요

    return (
        <>
            <Suspense fallback={<div>Loading banner...</div>}>
                <Banner
                    festivalList={festivalList}
                    currentMonth={currentMonth}
                />
            </Suspense>

            <div className="min-max-padding">
                <div className="md:mt-[40px] mt-[30px]">
                    <RegionSelector />
                </div>

                <div className="md:mt-[40px] mt-[30px] flex flex-col md:flex-row gap-[20px]">
                    <DateSelector />
                    <SearchBar />
                </div>

                <div className="mt-[60px] min-h-[400px] md:min-h-[600px]">
                    <FestivalCardList listType="home" />
                </div>
            </div>

            <BackToTopButton />
        </>
    );
}

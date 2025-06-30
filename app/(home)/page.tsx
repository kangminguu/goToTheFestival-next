import { Suspense } from "react";

import Banner from "./components/Banner/Banner";
import RegionSelector from "./components/RegionSelector/RegionSelector";
import DateSelector from "./components/DateSelector/DateSelector";
import SearchBar from "./components/SearchBar/SearchBar";
import FestivalCardList from "../../components/FestivalCardList/FestivalCardList";
import { getLastDayOfMonth, getToday } from "../../lib/utils";
import { getFestivalList } from "../../lib/api/festival";

export function generateMetadata() {
    return {
        title: "축제가자",
        description:
            "전국 방방곡곡에서 열리는 특별한 축제를 소개합니다. 지역별, 일정별로 쉽게 확인하고 나만의 축제 계획을 세워보세요!",
    };
}

export default async function Page() {
    const today = getToday(); // 오늘 YYYYMMDD
    const lastDate = getLastDayOfMonth(); // 이번 달 마지막일 YYYYMMDD
    const { festivalList } = await getFestivalList({
        pageNo: 1,
        numOfRows: 6,
        eventStartDate: today,
        eventEndDate: lastDate,
        arrange: "Q",
    });

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

                <div className="mt-[60px] min-h-[400px] md:min-h-[600px]">
                    <FestivalCardList listType="home" />
                </div>
            </div>
        </>
    );
}

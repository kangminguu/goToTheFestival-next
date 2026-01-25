"use client";

import { useState } from "react";
import FestivalCardList from "../../../components/FestivalCardList/FestivalCardList";
import DateSelector from "./DateSelector/DateSelector";
import RegionSelector from "./RegionSelector/RegionSelector";
import SearchBar from "./SearchBar/SearchBar";
import { REGION_CODES, RegionCode } from "../../../constants/regions";

export default function SearchContainer() {
    // 검색 지역
    const [region, setRegion] = useState<RegionCode>(REGION_CODES.ALL); // 기본값: 전국
    // 검색 선택 날짜
    const [selectedDate, setSelectedDate] = useState<{
        startDate: string;
        endDate: string;
    }>({
        startDate: "",
        endDate: "",
    });
    // 검색 키워드
    const [keyword, setKeyword] = useState<string>("");

    return (
        <div className="min-max-padding">
            <div className="md:mt-[40px] mt-[30px]">
                <RegionSelector region={region} setRegion={setRegion} />
            </div>

            <div className="md:mt-[40px] mt-[30px] flex flex-col md:flex-row gap-[20px]">
                <DateSelector />
                <SearchBar />
            </div>

            <div className="mt-[60px] min-h-[400px] md:min-h-[600px]">
                <FestivalCardList region={region} listType="home" />
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import SortSelector from "./SortSelector";
import FestivalCard from "../FestivalCard/FestivalCard";
import { convertDateToYYYYMMDD } from "../../lib/utils";
import {
    useEventDateStore,
    useInputValueStore,
    useRegionStore,
} from "../../stores";
import FestivalCardSkeleton from "../FestivalCard/FestivalCardSkeleton";
import { sortByDate, sortByDistance } from "./utils";

export default function FestivalCardList() {
    const [sortOption, setSortOption] = useState<"date" | "distance">(
        "distance"
    );
    const [festivalList, setFestivalList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { regionCode } = useRegionStore();
    const { eventDate } = useEventDateStore();
    const { searchForm } = useInputValueStore();

    useEffect(() => {
        const fetchData = async () => {
            const eventStartDate = convertDateToYYYYMMDD(eventDate[0]);
            const eventEndDate = convertDateToYYYYMMDD(eventDate[1]);

            const params = new URLSearchParams({
                pageNo: "1",
                numOfRows: "10000",
                eventStartDate,
                eventEndDate,
                areaCode: regionCode,
                keyword: searchForm,
            });

            const res = await fetch(`/api/festival?${params.toString()}`);
            const data = await res.json();

            setFestivalList(
                (sortOption === "date"
                    ? sortByDate(data.festivalList)
                    : sortByDistance(data.festivalList)) || []
            );

            setIsLoading(false);
        };

        fetchData();
    }, [eventDate, regionCode, searchForm, sortOption]);

    return (
        <div className="flex flex-col gap-[15px]">
            <SortSelector
                sortOption={sortOption}
                setSortOption={setSortOption}
            />
            <div className="w-full flex flex-wrap gap-[10px] lg:grid lg:grid-cols-4 md:grid md:grid-cols-3">
                {isLoading
                    ? Array.from({ length: 12 }).map((_, index) => (
                          <FestivalCardSkeleton key={index} />
                      ))
                    : festivalList.map((festival) => (
                          <FestivalCard
                              key={festival.contentid}
                              festival={festival}
                          />
                      ))}
            </div>
        </div>
    );
}

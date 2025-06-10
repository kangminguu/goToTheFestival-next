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
import Button from "../Button/Button";
import EmptyCardList from "./EmptyCardList";

export default function FestivalCardList() {
    const [sortOption, setSortOption] = useState<"date" | "distance">("date");

    const [festivalList, setFestivalList] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(12);
    const [showList, setShowList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const { regionCode } = useRegionStore();
    const { eventDate } = useEventDateStore();
    const { searchForm } = useInputValueStore();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

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

            const sortedList =
                sortOption === "date"
                    ? sortByDate(data.festivalList || [])
                    : sortByDistance(data.festivalList || []);

            setFestivalList(sortedList || []); // 전체 리스트
            setTotalCount(data.totalCount); // 전체 카운트

            const slicedList = sortedList.slice(0, 12);

            setShowList(slicedList || []);

            setPage(12);

            setIsLoading(false);
        };

        fetchData();
    }, [eventDate, regionCode, searchForm, sortOption]);

    useEffect(() => {
        setShowList(festivalList.slice(0, page));
    }, [page]);

    return (
        <div className="flex flex-col gap-[15px]">
            <SortSelector
                sortOption={sortOption}
                setSortOption={setSortOption}
            />

            <div className="w-full flex flex-wrap gap-[10px] lg:grid lg:grid-cols-4 md:grid md:grid-cols-3">
                {isLoading
                    ? Array.from({ length: page }).map((_, index) => (
                          <FestivalCardSkeleton key={index} />
                      ))
                    : showList.map((festival) => (
                          <FestivalCard
                              key={festival.contentid}
                              festival={festival}
                          />
                      ))}
            </div>

            {!isLoading && totalCount === 0 ? <EmptyCardList /> : null}

            <div className="w-full row-center justify-center mt-[20px] mb-[100px]">
                {page / 12 !== Math.floor(totalCount / 12 + 1) ? (
                    <Button
                        onClick={() => setPage(page + 12)}
                        title={`더 보기 ${page / 12} / ${Math.floor(
                            totalCount / 12 + 1
                        )}`}
                        isBorder
                    />
                ) : null}
            </div>
        </div>
    );
}

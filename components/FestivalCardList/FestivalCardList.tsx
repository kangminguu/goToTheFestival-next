"use client";

import { useEffect, useState } from "react";
import SortSelector from "./SortSelector";
import FestivalCard from "../FestivalCard/FestivalCard";
import { convertDateToYYYYMMDD } from "../../lib/utils";
import {
    useEventDateStore,
    useFavoriteStore,
    useInputValueStore,
    useRegionStore,
} from "../../stores";
import FestivalCardSkeleton from "../FestivalCard/FestivalCardSkeleton";
import { sortByDate, sortByDistance } from "./utils";
import Button from "../Button/Button";
import EmptyCardList from "./EmptyCardList";

type ListType = "home" | "favorite";

export default function FestivalCardList({ listType }: { listType: ListType }) {
    const [sortOption, setSortOption] = useState<"date" | "distance">("date");

    const [festivalList, setFestivalList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(12);
    const [showList, setShowList] = useState<any[]>([]);
    const [totalCount, setTotalCount] = useState(0);

    const { favorites } = useFavoriteStore();
    const { regionCode } = useRegionStore();
    const { eventDate } = useEventDateStore();
    const { searchForm } = useInputValueStore();

    // 축제 리스트 상태와 정렬
    const updateFestivalList = async (list: any[]) => {
        if (!list || list.length === 0) {
            setFestivalList([]);
            setShowList([]);
            setTotalCount(0);
            setPage(12);
            setIsLoading(false);
            return;
        }

        const sortedList =
            sortOption === "date"
                ? sortByDate(list)
                : await sortByDistance(list);

        setFestivalList(sortedList);
        setTotalCount(sortedList.length);
        setShowList(sortedList.slice(0, 12));
        setPage(12);
        setIsLoading(false);
    };

    // 메인페이지 검색 리스트
    useEffect(() => {
        if (listType !== "home") return;

        const fetchSearchData = async () => {
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

            const res = await fetch(`/api/festivalList?${params.toString()}`);
            const data = await res.json();

            await updateFestivalList(data.festivalList || []);
        };

        fetchSearchData();
    }, [eventDate, regionCode, searchForm]);

    // 찜 페이지 리스트
    useEffect(() => {
        if (listType !== "favorite") return;

        const fetchFavoriteData = async () => {
            setIsLoading(true);

            if (favorites.length === 0) {
                await updateFestivalList([]);
                return;
            }

            const params = new URLSearchParams({
                pageNo: "1",
                numOfRows: "10000",
                eventStartDate: "20000101",
            });

            const res = await fetch(`/api/festivalList?${params.toString()}`);
            const data = await res.json();

            const favoriteSet = new Set(favorites);
            const filteredFavorites = (data.festivalList || []).filter((obj) =>
                favoriteSet.has(obj.contentid)
            );

            await updateFestivalList(filteredFavorites || []);
        };

        fetchFavoriteData();
    }, [favorites]);

    // 정렬 옵션 변경 시 정렬 재적용
    useEffect(() => {
        const sortList = async () => {
            if (festivalList.length === 0) return;

            setIsLoading(true);
            await updateFestivalList(festivalList);
        };

        sortList();
    }, [sortOption]);

    // 페이지 변경 시 보여주는 리스트 갱신
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

            {!isLoading && totalCount === 0 && (
                <EmptyCardList listType={listType} />
            )}

            <div className="w-full row-center justify-center mt-[20px] mb-[60px]">
                {page !== totalCount ? (
                    page / 12 !== Math.floor(totalCount / 12 + 1) ? (
                        <Button
                            onClick={() => setPage(page + 12)}
                            title={`더 보기 ${page / 12} / ${Math.floor(
                                totalCount % 12 === 0
                                    ? totalCount / 12
                                    : totalCount / 12 + 1
                            )}`}
                            isBorder
                        />
                    ) : null
                ) : null}
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import SortSelector from "../../../components/FestivalCardList/SortSelector";
import {
    sortByDate,
    sortByDistance,
} from "../../../components/FestivalCardList/utils";
import { useFavoriteStore } from "../../../stores";
import FestivalCardSkeleton from "../../../components/FestivalCard/FestivalCardSkeleton";
import FestivalCard from "../../../components/FestivalCard/FestivalCard";
import EmptyFavoriteList from "./EmptyFavoriteList";
import Button from "../../../components/Button/Button";

export default function FavoriteList() {
    const [sortOption, setSortOption] = useState<"date" | "distance">("date");

    const { favorites } = useFavoriteStore();

    const [isLoading, setIsLoading] = useState(true);
    const [festivalList, setFestivalList] = useState<any[]>([]);
    const [page, setPage] = useState(12);
    const [showList, setShowList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const sortedData = async () => {
            setIsLoading(true);

            const sortedList =
                sortOption === "date"
                    ? sortByDate(Object.values(favorites) || [])
                    : await sortByDistance(
                          Object.values(favorites) || []
                      );

            setFestivalList(sortedList);

            setTotalCount(sortedList.length); // 전체 카운트

            const slicedList = sortedList.slice(0, 12);

            setShowList(slicedList);

            setPage(12);

            setIsLoading(false);
        };

        sortedData();
    }, [favorites, sortOption, isLoading]);

    useEffect(() => {
        setShowList(festivalList.slice(0, page));
    }, [page]);

    return (
        <div className="mt-[30px] md:mt-[60px] flex flex-col gap-[15px]">
            <SortSelector
                sortOption={sortOption}
                setSortOption={setSortOption}
            />

            <div className="w-full flex flex-wrap gap-[10px] lg:grid lg:grid-cols-4 md:grid md:grid-cols-3">
                {isLoading
                    ? Array.from({ length: page }).map((_, index) => (
                          <FestivalCardSkeleton key={index} />
                      ))
                    : showList.map((festival, index) => (
                          <FestivalCard key={index} festival={festival} />
                      ))}
            </div>

            {!isLoading && totalCount === 0 ? <EmptyFavoriteList /> : null}

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

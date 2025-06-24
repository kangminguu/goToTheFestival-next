"use client";

import { useState } from "react";
import SortSelector from "../../../components/FestivalCardList/SortSelector";
import {
    sortByDate,
    sortByDistance,
} from "../../../components/FestivalCardList/utils";
import { useFavoriteStore } from "../../../stores";
import FestivalCardSkeleton from "../../../components/FestivalCard/FestivalCardSkeleton";
import FestivalCard from "../../../components/FestivalCard/FestivalCard";

export default function FavoriteList() {
    const [sortOption, setSortOption] = useState<"date" | "distance">("date");

    const [isLoading, setIsLoading] = useState(true);

    const { favorites } = useFavoriteStore();

    return (
        <div className="mt-[30px] md:mt-[60px] flex flex-col gap-[15px]">
            <SortSelector
                sortOption={sortOption}
                setSortOption={setSortOption}
            />

            <div className="w-full flex flex-wrap gap-[10px] lg:grid lg:grid-cols-4 md:grid md:grid-cols-3">
                {/* {isLoading
                    ? Array.from({ length: page }).map((_, index) => (
                          <FestivalCardSkeleton key={index} />
                      ))
                    : showList.map((festival) => (
                          <FestivalCard
                              key={festival.contentid}
                              festival={festival}
                          />
                      ))} */}
            </div>
        </div>
    );
}

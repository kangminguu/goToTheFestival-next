"use client";

import { useEffect, useState } from "react";
import SortSelector from "./SortSelector";
import FestivalCard from "../FestivalCard/FestivalCard";
import { useFavoriteStore, useInputValueStore } from "../../stores";
import FestivalCardSkeleton from "../FestivalCard/FestivalCardSkeleton";
import Button from "../Button/Button";
import EmptyCardList from "./EmptyCardList";
import { RegionCode } from "../../constants/regions";

type ListType = "home" | "favorite";

const setIpLocation = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    return {
        lat: data.latitude,
        lng: data.longitude,
    };
};

export default function FestivalCardList({
    region = "",
    startDate = "2000-01-01",
    endDate = "2050-12-31",
    listType,
}: {
    region?: RegionCode;
    startDate?: string;
    endDate?: string;
    listType: ListType;
}) {
    const [sortOption, setSortOption] = useState<
        "date" | "distance" | "review_count"
    >("date");
    const [userLocation, setUserLocation] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

    const [festivalList, setFestivalList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const { favorites } = useFavoriteStore();
    const { searchForm } = useInputValueStore();

    // distance 정렬 시 위치 정보 요청
    useEffect(() => {
        if (sortOption === "distance") {
            const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

            if (isMobile) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setUserLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => {
                        alert("위치 정보를 허용해주세요");
                        setSortOption("date");
                    },
                );
            } else {
                setIpLocation().then((location) => {
                    setUserLocation(location);
                });
            }
        }
    }, [sortOption]);

    // 메인페이지 검색 리스트 - DB에서 가져오기
    useEffect(() => {
        if (listType !== "home") return;

        const fetchSearchData = async () => {
            setIsLoading(true);
            setFestivalList([]); // 초기화
            setHasMore(true);

            const params = new URLSearchParams({
                eventStartDate: startDate,
                eventEndDate: endDate,
                areaCode: region,
                keyword: searchForm,
                sortBy: sortOption,
                limit: "13", // 12 + 1개 더 가져와서 더보기 존재 여부 확인
                offset: "0",
                ...(sortOption === "distance" &&
                    userLocation && {
                        userLat: userLocation.lat.toString(),
                        userLng: userLocation.lng.toString(),
                    }),
            });

            const res = await fetch(`/api/festivalList?${params.toString()}`);
            const data = await res.json();

            const newList = data.festivalList || [];
            setFestivalList(newList.slice(0, 12)); // 12개까지만 표시
            setHasMore(newList.length > 12); // 12개 이상이면 더 있다는 뜻
            setIsLoading(false);
        };

        // distance 정렬인데 위치정보가 없으면 대기
        if (sortOption === "distance" && !userLocation) {
            return;
        }

        fetchSearchData();
    }, [
        startDate,
        endDate,
        region,
        searchForm,
        sortOption,
        userLocation,
        listType,
    ]);

    // 찜 페이지 리스트
    useEffect(() => {
        if (listType !== "favorite") return;

        const fetchFavoriteData = async () => {
            setIsLoading(true);
            setFestivalList([]);
            setHasMore(false); // 찜은 전체 로드

            if (favorites.length === 0) {
                setIsLoading(false);
                return;
            }

            const params = new URLSearchParams({
                eventStartDate: "2000-01-01",
                eventEndDate: "2050-12-31",
                limit: "10000",
                contentIds: favorites.join(","),
            });

            const res = await fetch(`/api/festivalList?${params.toString()}`);
            const data = await res.json();

            setFestivalList(data.festivalList || []);
            setIsLoading(false);
        };

        fetchFavoriteData();
    }, [favorites]);

    // 더 보기 함수
    const loadMore = async () => {
        if (listType !== "home" || !hasMore || isLoading) return;

        setIsLoading(true);

        const params = new URLSearchParams({
            eventStartDate: startDate,
            eventEndDate: endDate,
            areaCode: region,
            keyword: searchForm,
            sortBy: sortOption,
            limit: "13",
            offset: festivalList.length.toString(), // 현재 개수만큼 offset
            ...(sortOption === "distance" &&
                userLocation && {
                    userLat: userLocation.lat.toString(),
                    userLng: userLocation.lng.toString(),
                }),
        });

        const res = await fetch(`/api/festivalList?${params.toString()}`);
        const data = await res.json();

        const newData = data.festivalList || [];

        if (newData.length > 0) {
            setFestivalList((prev) => [...prev, ...newData.slice(0, 12)]); // 누적
            setHasMore(newData.length > 12); // 12개 이상이면 더 있다는 뜻
        } else {
            setHasMore(false);
        }

        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-[15px]">
            {listType !== "favorite" && (
                <SortSelector
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                />
            )}

            <div className="w-full flex flex-wrap gap-[10px] lg:grid lg:grid-cols-4 md:grid md:grid-cols-3">
                {isLoading && festivalList.length === 0
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

            {!isLoading && festivalList.length === 0 && (
                <EmptyCardList listType={listType} />
            )}

            <div className="w-full row-center justify-center mt-[20px] mb-[60px]">
                {listType === "home" && hasMore && !isLoading && (
                    <Button onClick={loadMore} title={`더 보기`} isBorder />
                )}
                {isLoading && festivalList.length > 0 && (
                    <div className="text-font-secondary">로딩 중...</div>
                )}
            </div>
        </div>
    );
}

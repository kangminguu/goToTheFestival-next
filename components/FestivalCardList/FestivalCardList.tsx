"use client";

import { useEffect, useState } from "react";
import SortSelector from "./SortSelector";
import FestivalCard from "../FestivalCard/FestivalCard";
import {
    useEventDateStore,
    useFavoriteStore,
    useInputValueStore,
    useRegionStore,
} from "../../stores";
import FestivalCardSkeleton from "../FestivalCard/FestivalCardSkeleton";
import Button from "../Button/Button";
import EmptyCardList from "./EmptyCardList";

type ListType = "home" | "favorite";

function convertDateToDateString(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export default function FestivalCardList({ listType }: { listType: ListType }) {
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
    const { regionCode } = useRegionStore();
    const { eventDate } = useEventDateStore();
    const { searchForm } = useInputValueStore();

    // distance 정렬 시 위치 정보 요청
    useEffect(() => {
        if (sortOption === "distance") {
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
                eventStartDate: convertDateToDateString(eventDate[0]),
                eventEndDate: convertDateToDateString(eventDate[1]),
                areaCode: regionCode,
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
    }, [eventDate, regionCode, searchForm, sortOption, userLocation, listType]);

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
                offset: "0",
            });

            const res = await fetch(`/api/festivalList?${params.toString()}`);
            const data = await res.json();

            const favoriteSet = new Set(favorites);
            const filteredFavorites = (data.festivalList || []).filter((obj) =>
                favoriteSet.has(obj.contentid),
            );

            setFestivalList(filteredFavorites);
            setIsLoading(false);
        };

        fetchFavoriteData();
    }, [favorites]);

    // 더 보기 함수
    const loadMore = async () => {
        if (listType !== "home" || !hasMore || isLoading) return;

        setIsLoading(true);

        const params = new URLSearchParams({
            eventStartDate: convertDateToDateString(eventDate[0]),
            eventEndDate: convertDateToDateString(eventDate[1]),
            areaCode: regionCode,
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
            <SortSelector
                sortOption={sortOption}
                setSortOption={setSortOption}
            />

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

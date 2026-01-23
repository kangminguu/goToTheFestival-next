// "use client";

// import { useEffect, useState } from "react";
// import SortSelector from "./SortSelector";
// import FestivalCard from "../FestivalCard/FestivalCard";
// import { convertDateToYYYYMMDD } from "../../lib/utils";
// import {
//     useEventDateStore,
//     useFavoriteStore,
//     useInputValueStore,
//     useRegionStore,
// } from "../../stores";
// import FestivalCardSkeleton from "../FestivalCard/FestivalCardSkeleton";
// import { sortByDate, sortByDistance } from "./utils";
// import Button from "../Button/Button";
// import EmptyCardList from "./EmptyCardList";

// type ListType = "home" | "favorite";

// export default function FestivalCardList({ listType }: { listType: ListType }) {
//     const [sortOption, setSortOption] = useState<
//         "date" | "distance" | "review_count"
//     >("date");

//     const [festivalList, setFestivalList] = useState<any[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [page, setPage] = useState(12);
//     const [showList, setShowList] = useState<any[]>([]);
//     const [totalCount, setTotalCount] = useState(0);

//     const { favorites } = useFavoriteStore();
//     const { regionCode } = useRegionStore();
//     const { eventDate } = useEventDateStore();
//     const { searchForm } = useInputValueStore();

//     // 축제 리스트 상태와 정렬
//     const updateFestivalList = async (list: any[]) => {
//         if (!list || list.length === 0) {
//             setFestivalList([]);
//             setShowList([]);
//             setTotalCount(0);
//             setPage(12);
//             setIsLoading(false);
//             return;
//         }

//         const sortedList =
//             sortOption === "date"
//                 ? sortByDate(list)
//                 : await sortByDistance(list);

//         setFestivalList(sortedList);
//         setTotalCount(sortedList.length);
//         setShowList(sortedList.slice(0, 12));
//         setPage(12);
//         setIsLoading(false);
//     };

//     // 메인페이지 검색 리스트
//     useEffect(() => {
//         if (listType !== "home") return;

//         const fetchSearchData = async () => {
//             setIsLoading(true);

//             const eventStartDate = convertDateToYYYYMMDD(eventDate[0]);
//             const eventEndDate = convertDateToYYYYMMDD(eventDate[1]);

//             const params = new URLSearchParams({
//                 pageNo: "1",
//                 numOfRows: "10000",
//                 eventStartDate,
//                 eventEndDate,
//                 areaCode: regionCode,
//                 keyword: searchForm,
//             });

//             const res = await fetch(`/api/festivalList?${params.toString()}`);
//             const data = await res.json();

//             await updateFestivalList(data.festivalList || []);
//         };

//         fetchSearchData();
//     }, [eventDate, regionCode, searchForm]);

//     // 찜 페이지 리스트
//     useEffect(() => {
//         if (listType !== "favorite") return;

//         const fetchFavoriteData = async () => {
//             setIsLoading(true);

//             if (favorites.length === 0) {
//                 await updateFestivalList([]);
//                 return;
//             }

//             const params = new URLSearchParams({
//                 pageNo: "1",
//                 numOfRows: "10000",
//                 eventStartDate: "20000101",
//             });

//             const res = await fetch(`/api/festivalList?${params.toString()}`);
//             const data = await res.json();

//             const favoriteSet = new Set(favorites);
//             const filteredFavorites = (data.festivalList || []).filter((obj) =>
//                 favoriteSet.has(obj.contentid),
//             );

//             await updateFestivalList(filteredFavorites || []);
//         };

//         fetchFavoriteData();
//     }, [favorites]);

//     // 정렬 옵션 변경 시 정렬 재적용
//     useEffect(() => {
//         const sortList = async () => {
//             if (festivalList.length === 0) return;

//             setIsLoading(true);
//             await updateFestivalList(festivalList);
//         };

//         sortList();
//     }, [sortOption]);

//     // 페이지 변경 시 보여주는 리스트 갱신
//     useEffect(() => {
//         setShowList(festivalList.slice(0, page));
//     }, [page]);

//     return (
//         <div className="flex flex-col gap-[15px]">
//             <SortSelector
//                 sortOption={sortOption}
//                 setSortOption={setSortOption}
//             />

//             <div className="w-full flex flex-wrap gap-[10px] lg:grid lg:grid-cols-4 md:grid md:grid-cols-3">
//                 {isLoading
//                     ? Array.from({ length: page }).map((_, index) => (
//                           <FestivalCardSkeleton key={index} />
//                       ))
//                     : showList.map((festival) => (
//                           <FestivalCard
//                               key={festival.contentid}
//                               festival={festival}
//                           />
//                       ))}
//             </div>

//             {!isLoading && totalCount === 0 && (
//                 <EmptyCardList listType={listType} />
//             )}

//             <div className="w-full row-center justify-center mt-[20px] mb-[60px]">
//                 {page !== totalCount ? (
//                     page / 12 !== Math.floor(totalCount / 12 + 1) ? (
//                         <Button
//                             onClick={() => setPage(page + 12)}
//                             title={`더 보기 ${page / 12} / ${Math.floor(
//                                 totalCount % 12 === 0
//                                     ? totalCount / 12
//                                     : totalCount / 12 + 1,
//                             )}`}
//                             isBorder
//                         />
//                     ) : null
//                 ) : null}
//             </div>
//         </div>
//     );
// }
"use client";

import { useEffect, useState } from "react";
import SortSelector from "./SortSelector";
import FestivalCard from "../FestivalCard/FestivalCard";
import { convertDateToYYYYMMDD, getToday } from "../../lib/utils";
import {
    useEventDateStore,
    useFavoriteStore,
    useInputValueStore,
    useRegionStore,
} from "../../stores";
import FestivalCardSkeleton from "../FestivalCard/FestivalCardSkeleton";
import { sortByDistance } from "./utils";
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

    // 날짜 상태 (YYYY-MM-DD 형식)
    // const [eventStartDate, setEventStartDate] = useState<string>(getToday());
    // const [eventEndDate, setEventEndDate] = useState<string>(getToday());

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
                limit: "12",
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
            setFestivalList(newList);
            setHasMore(newList.length === 12); // 12개 미만이면 더 이상 없음
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
            limit: "12",
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
            setFestivalList((prev) => [...prev, ...newData]); // 누적
            setHasMore(newData.length === 12); // 12개 미만이면 마지막
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

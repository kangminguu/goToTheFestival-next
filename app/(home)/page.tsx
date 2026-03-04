import Banner from "./components/Banner/Banner";
import BackToTopButton from "../../components/BackToTopButton/BackToTopButton";
import { getBannerFestivalListFromDB } from "../../lib/api/festival/getFestivalListFromDB";
import { FALLBACK_BANNER_FESTIVALS } from "../../constants/fallBackBannerFestivals";
import SearchContainer from "./components/SearchContainer";

export function generateMetadata() {
    return {
        title: "축제가자",
        description:
            "전국 방방곡곡에서 열리는 특별한 축제를 소개합니다. 지역별, 일정별로 쉽게 확인하고 나만의 축제 계획을 세워보세요!",
        openGraph: {
            title: "축제가자",
            description:
                "전국 방방곡곡에서 열리는 특별한 축제를 소개합니다. 지역별, 일정별로 쉽게 확인하고 나만의 축제 계획을 세워보세요!",
            url: "https://www.gotothefestival.co.kr",
            siteName: "축제가자",
            images: [
                {
                    url: "https://www.gotothefestival.co.kr/gotothefestival.png",
                    width: 1200,
                    height: 630,
                },
            ],
            locale: "ko_KR",
            type: "website",
        },
    };
}

export default async function Page() {
    // 이번 달
    const currentMonth = new Date().getMonth() + 1;

    // 배너용 축제 리스트 가져오기
    const festivalList =
        (await getBannerFestivalListFromDB({
            month: currentMonth,
            limit: 6,
        })) ?? FALLBACK_BANNER_FESTIVALS;

    if (festivalList.length === 0)
        festivalList.push(...FALLBACK_BANNER_FESTIVALS);

    return (
        <>
            <Banner festivalList={festivalList} currentMonth={currentMonth} />

            <SearchContainer />

            <BackToTopButton />
        </>
    );
}

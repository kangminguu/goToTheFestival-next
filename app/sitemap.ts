import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let festivals: any[] = [];

    try {
        // 축제 리스트
        const fetchFestivalList = await fetch(
            "https://www.gotothefestival.co.kr/api/festivalList?pageNo=1&numOfRows=1000",
            { next: { revalidate: 60 * 60 * 24 } } // 24시간마다 캐시 갱신
        ).then((res) => res.json());

        festivals = fetchFestivalList.festivalList ?? [];
    } catch (err) {
        console.error("sitemap fetch error:", err);
        festivals = [];
    }

    // 정적 페이지
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: "https://www.gotothefestival.co.kr",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
    ];

    // 동적 페이지 : 축제 상세 페이지
    const festivalPages: MetadataRoute.Sitemap = festivals.map((festival) => ({
        url: `https://www.gotothefestival.co.kr/detail/${festival.contentid}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
    }));

    return [...staticPages, ...festivalPages];
}

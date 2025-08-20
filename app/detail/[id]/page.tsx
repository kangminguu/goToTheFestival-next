import {
    getFestivalCommon,
    getFestivalContents,
    getFestivalIntroduction,
    getFestvalImage,
} from "../../../lib/api/festival";
import DetailHeader from "./components/DetailHeader";
import DetailImageSwiper from "./components/DetailImageSwiper";
import DetailIntroductionSection from "./components/DetailIntroductionSection";
import DetailTitleSection from "./components/DetailTitleSection/DetailTitleSection";
import { convertBr } from "../../../lib/utils";
import DetailLocationSection from "./components/DetailLocationSection";
import BackToTopButton from "../../../components/BackToTopButton/BackToTopButton";
import DetailRatingSection from "./components/DetailRatingSection/DetailRatingSection";
import { createClient } from "../../../lib/utils/server";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const festivalCommon = await getFestivalCommon(id);

    return {
        title: `${festivalCommon.title} - 축제가자`,
        description: `${convertBr(festivalCommon.overview)}`,
    };
}

export default async function DetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // 로딩 페이지 개발을 위해 무한 대기
    // await new Promise(() => {});

    const { id: contentId } = await params;
    const supabase = createClient();

    // 모든 축제 정보
    const festivalCommon = await getFestivalCommon(contentId); // 축제 이름, 전화번호, 홈페이지, 대표이미지, 주소, 좌표값, 소개1
    const festivalContents = await getFestivalContents(contentId); // 설명1, 설명2
    const festivalIntroduction = await getFestivalIntroduction(contentId); // 종료일, 축제 장소, 시작일, 개장 시간, 스폰서1, 스폰서2, 비용
    const festivalImageList = (await getFestvalImage(contentId)) || []; // 축제 이미지 리스트

    // 대표이미지를 맨 앞에 추가 + 대표이미지도 없는 경우 no_image 추가
    festivalImageList.unshift({
        originimgurl:
            festivalCommon.firstimage ||
            festivalCommon.firstimage2 ||
            "/assets/no_image.png",
        imgname: "대표이미지",
        serialnum: contentId + "_0",
    });

    // 축제 평균 점수와 후기 개수 패칭
    const { data, error: festivalRatings_error } = await (await supabase)
        .from("festival_ratings")
        .select("avg_rating, review_count")
        .eq("festival_id", contentId)
        .maybeSingle();

    // 평균 평점 : 오류가 나거나 평점이 없다면 0으로
    const avgRating =
        !festivalRatings_error && data?.avg_rating ? data.avg_rating : 0; // data가 null인경우 처리를 좀 더 가독성 좋게
    // 후기 개수 : 오류가 나거나 후기 개수가 없다면 0으로
    const ratingCount =
        !festivalRatings_error && data?.review_count ? data.review_count : 0;

    // 해당 축제 전체 후기 패칭 : 해당 축제에 대한 리뷰가 없으면 reviews = [], 빈 배열
    const { data: reviews, error: reviews_error } = await (await supabase)
        .from("review_with_user")
        .select("*")
        .eq("festival_id", contentId)
        .order("created_at", { ascending: false });

    const {
        data: { user },
    } = await (await supabase).auth.getUser();

    return (
        <>
            <div className="min-max-padding">
                {/* 뒤로가기, URL복사 버튼 */}
                <DetailHeader />

                {/* 축제 이미지 스와이퍼 */}
                <DetailImageSwiper imageList={festivalImageList} />

                {/* 축제 제목, 찜, 평점 */}
                <DetailTitleSection
                    contentid={contentId}
                    title={festivalCommon.title}
                    eventstartdate={festivalIntroduction.eventstartdate}
                    eventenddate={festivalIntroduction.eventenddate}
                    avgRating={avgRating}
                    ratingCount={ratingCount}
                />

                {/* 축제 상세 설명 */}
                <DetailIntroductionSection
                    address={festivalCommon.addr1}
                    eventStartDate={festivalIntroduction.eventstartdate}
                    eventEndDate={festivalIntroduction.eventenddate}
                    playTime={festivalIntroduction.playtime}
                    fee={festivalIntroduction.usetimefestival}
                    tel={festivalCommon.tel}
                    homepage={festivalCommon.homepage}
                    info_1={festivalContents[0].infotext}
                    info_2={
                        festivalContents[1]
                            ? festivalContents[1].infotext
                            : null
                    }
                />

                {/* 축제 후기 */}
                <DetailRatingSection
                    contentId={contentId}
                    title={festivalCommon.title}
                    avgRating={avgRating}
                    ratingCount={ratingCount}
                    reviews={reviews}
                    userId={user ? user.id : null}
                />
                {/* 에러가 난 경우 해당 섹션만 "후기를 불러오지 못했습니다." 보여주도록 */}
                {/* 정신 나갈거 같은 부분, next를 사용한 이유인 서버 액션 구조로 바꾸자 제발 */}

                {/* 축제 위치 지도 */}
                <DetailLocationSection
                    address={festivalCommon.addr1}
                    mapx={festivalCommon.mapx}
                    mapy={festivalCommon.mapy}
                />
            </div>

            <BackToTopButton />
        </>
    );
}

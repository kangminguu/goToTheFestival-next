import {
    getFestivalCommon,
    getFestivalContents,
    getFestivalIntroduction,
    getFestvalImage,
} from "../../../lib/api/festival";
import DetailHeader from "./components/DetailHeader";
import DetailImageSwiper from "./components/DetailImageSwiper";
import DetailIntroductionSection from "./components/DetailIntroductionSection";
import DetailTitleSection from "./components/DetailTitleSection";
import { convertBr } from "../../../lib/utils";
import DetailLocationSection from "./components/DetailLocationSection";
import BackToTopButton from "../../../components/BackToTopButton/BackToTopButton";

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
    const { id: contentId } = await params;

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

    return (
        <>
            <div className="min-max-padding">
                {/* 뒤로가기, URL복사 버튼 */}
                <DetailHeader />

                {/* 축제 이미지 스와이퍼 */}
                <DetailImageSwiper imageList={festivalImageList} />

                {/* 축제 제목, 찜, 평점 */}
                <DetailTitleSection
                    contentid={festivalCommon.contentid}
                    title={festivalCommon.title}
                    eventstartdate={festivalIntroduction.eventstartdate}
                    eventenddate={festivalIntroduction.eventenddate}
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

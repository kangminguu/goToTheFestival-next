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

interface DetailPageParams {
    params: { id: string };
}

export async function generateMetadata({ params }: DetailPageParams) {
    const id = (await params).id;

    return {
        title: id,
    };
}

export default async function DetailPage({ params }: DetailPageParams) {
    const contentId = (await params).id;

    const festivalCommon = await getFestivalCommon(contentId); // 축제 이름, 전화번호, 홈페이지, 대표이미지, 주소, 좌표값, 소개1
    const festivalContents = await getFestivalContents(contentId); // 설명1, 설명2
    const festivalIntroduction = await getFestivalIntroduction(contentId); // 종료일, 축제 장소, 시작일, 개장 시간, 스폰서1, 스폰서2, 비용
    const festivalImageList = (await getFestvalImage(contentId)) || []; // 축제 이미지 리스트

    console.log(festivalContents);

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
        <div className="min-max-padding mb-[100px]">
            <DetailHeader />

            <DetailImageSwiper imageList={festivalImageList} />

            <DetailTitleSection
                title={festivalCommon.title}
                eventStartDate={festivalIntroduction.eventstartdate}
                eventEndDate={festivalIntroduction.eventenddate}
                contentId={festivalCommon.contentid}
            />

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
                    festivalContents[1] ? festivalContents[1].infotext : null
                }
            />
        </div>
    );
}

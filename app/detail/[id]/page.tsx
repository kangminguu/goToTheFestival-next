import { getFestivalCommon, getFestvalImage } from "../../../lib/api/festival";
import DetailHeader from "./components/DetailHeader";
import DetailImageSwiper from "./components/DetailImageSwiper";

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

    const festivalInfo = await getFestivalCommon(contentId);

    // 이미지가 없을 경우 처리
    const festivalImageList = (await getFestvalImage(contentId)) || [];

    // 대표 이미지 + 축제 이미지 모두 없는 축제도 있음
    festivalImageList.unshift({
        originimgurl:
            festivalInfo.firstimage ||
            festivalInfo.firstimage2 ||
            "/assets/no_image.png",
        imgname: "대표이미지",
        serialnum: contentId + "_0",
    });

    return (
        <div className="min-max-padding">
            <DetailHeader />

            <DetailImageSwiper imageList={festivalImageList} />

            <div className="bg-font-muted h-[2000px] w-full"></div>
        </div>
    );
}

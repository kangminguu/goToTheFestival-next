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
    const festivalImageList = (await getFestvalImage(contentId)) || [
        {
            originimgurl: festivalInfo.firstimage,
            imgname: "대표이미지",
            serialnum: contentId + "_0",
        },
    ];

    console.log(festivalImageList);

    return (
        <div className="min-max-padding">
            <DetailHeader />

            <DetailImageSwiper imageList={festivalImageList} />
        </div>
    );
}

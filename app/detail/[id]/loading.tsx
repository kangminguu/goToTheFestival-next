import Button from "../../../components/Button/Button";
import FavoriteButton from "../../../components/FavoriteButton/FavoriteButton";
import DetailHeader from "./components/DetailHeader";

export default function Loading() {
    return (
        <div className="min-max-padding bg-background-base animate-pulse">
            {/* 뒤로가기, URL복사 버튼 */}
            <DetailHeader />

            {/* 이미지 부분 */}
            <div className="flex flex-col gap-[5px]">
                <div className="bg-background-hover rounded md:h-[516px] h-[250px]" />
                <div className="bg-background-hover rounded md:h-[150px] h-[50px]" />
            </div>

            {/* 태그, 타이틀 */}
            <div className="row-center gap-[10px] w-full mt-[20px]">
                <div className="h-[26px] w-[50px] rounded bg-background-hover" />
                <div className="md:h-[36px] h-[26px] w-[60%] bg-background-hover rounded" />
            </div>

            {/* 평점 */}
            <div className="h-[21px] md:h-[24px] w-[20%] rounded bg-background-hover mt-[5px]" />

            {/* 축제 상세 정보 */}
            <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px] mt-[20px]">
                <div className="md:h-[27px] h-[23px] w-[25%] bg-background-hover rounded" />
                <div className="md:h-[27px] h-[23px] w-[20%] bg-background-hover rounded" />
                <div className="md:h-[27px] h-[23px] w-[20%] bg-background-hover rounded" />
                <div className="md:h-[27px] h-[23px] w-[20%] bg-background-hover rounded" />
                <div className="md:h-[120px] h-[60px] w-full bg-background-hover rounded" />
            </div>

            {/* 축제 상세 정보 */}
            <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px] mt-[40px]">
                <div className="row-center justify-between">
                    <h2 className="md:text-[24px] text-[16px] font-semibold">
                        위치 보기
                    </h2>
                    <Button title="지도 보기" icon="/assets/open_in_new.svg" />
                </div>
                <div className="md:h-[27px] h-[23px] w-[30%] bg-background-hover rounded" />
                <div className="md:h-[385px] h-[200px] w-full bg-background-hover rounded" />
            </div>
        </div>
    );
}

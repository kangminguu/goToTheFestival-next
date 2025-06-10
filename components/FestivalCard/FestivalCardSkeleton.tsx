export default function FestivalCardSkeleton() {
    return (
        <div className="flex md:flex-col flex-row-reverse w-full min-h-[145px] gap-[10px] p-[10px] rounded bg-background-base animate-pulse">
            {/* 이미지 부분 */}
            <div className="relative shrink-0 w-[125px] h-[125px] overflow-hidden rounded md:w-full md:h-[190px] bg-background-hover" />

            <div className="flex flex-col w-full">
                {/* 태그, 제목 */}
                <div className="flex flex-row gap-[8px] items-top h-[52px]">
                    <div className="h-[26px] w-[50px] rounded bg-background-hover" />
                    <div className="h-[26px] w-[60%] bg-background-hover rounded" />
                </div>

                <div className="flex flex-col md:gap-[8px] gap-[5px] mt-[3px]">
                    {/* 평점 */}
                    <div className="flex flex-row gap-[5px] items-center">
                        <div className="w-[20px] md:w-[100px] h-[21px] bg-background-hover rounded" />
                        <div className="w-[30px] h-[21px] bg-background-hover rounded" />
                    </div>

                    {/* 위치 */}
                    <div className="h-[21px] w-[80%] bg-background-hover rounded" />

                    {/* 기간 */}
                    <div className="h-[21px] w-[60%] bg-background-hover rounded" />
                </div>
            </div>
        </div>
    );
}

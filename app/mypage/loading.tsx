export default function Loading() {
    return (
        <div className="min-max-padding bg-background-base animate-pulse">
            {/* 내 정보 */}
            <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] my-[41px] md:py-[36px] md:px-[30px] mb-[40px]">
                <h2 className="md:text-[24px] text-[16px] font-semibold">
                    내 정보
                </h2>

                <div className="row-center gap-[15px]">
                    <div className="md:h-[54px] h-[44px] md:w-[54px] w-[44px] rounded-full bg-background-hover shrink-0" />

                    <div className="flex flex-col md:h-[54px] h-[44px] w-full justify-between">
                        <div className="md:h-[25px] h-[20px] md:w-[10%] w-[30%] bg-background-hover rounded" />
                        <div className="md:h-[20px] h-[17px] md:w-[20%] w-[60%] bg-background-hover rounded" />
                    </div>
                </div>
            </div>

            {/* 내 정보 */}
            <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] my-[41px] md:py-[36px] md:px-[30px] mb-[40px]">
                <h2 className="md:text-[24px] text-[16px] font-semibold">
                    내 후기 관리
                </h2>

                <span className="w-full bg-border-base h-[1px]" />

                <div className="h-[21px] md:h-[24px] w-[20%] rounded bg-background-hover" />
                <div className="row-center justify-between">
                    <div className="h-[21px] md:h-[24px] w-[10%] rounded bg-background-hover" />
                    <div className="h-[18px] md:h-[20px] md:w-[36px] w-[30px] rounded bg-background-hover" />
                </div>

                <div className="flex flex-col gap-[5px]">
                    <div className="h-[21px] md:h-[24px] w-[100%] rounded bg-background-hover" />
                    <div className="h-[21px] md:h-[24px] w-[70%] rounded bg-background-hover" />
                </div>
            </div>

            {/* 후기 삭제, 탈퇴 */}
            <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] my-[41px] md:py-[36px] md:px-[30px] mb-[40px]">
                <div className="h-[21px] md:h-[24px] w-[20%] rounded bg-background-hover" />
                <div className="h-[21px] md:h-[24px] w-[20%] rounded bg-background-hover" />
            </div>
        </div>
    );
}

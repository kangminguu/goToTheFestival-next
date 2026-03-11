import Button from "@/components/Button/Button";

export default function DetailRatingError() {
    return (
        <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px] mt-[20px]">
            <div className="row-center justify-between">
                <h2 className="md:text-[24px] text-[16px] font-semibold">
                    축제 후기
                </h2>
            </div>

            <span className="text-font-secondary md:text-[16px] text-[15px] font-normal whitespace-pre-line">
                후기를 불러오는데 실패하였습니다. 잠시 후 다시 시도해주세요.
            </span>
        </div>
    );
}

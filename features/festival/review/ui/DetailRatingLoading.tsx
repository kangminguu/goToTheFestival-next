import Button from "@/components/Button/Button";

export default function DetailRatingLoading() {
    return (
        <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px] mt-[20px] animate-pulse">
            <div className="row-center justify-between">
                <h2 className="md:text-[24px] text-[16px] font-semibold">
                    축제 후기
                </h2>
                <div className="pointer-events-none">
                    <Button title="후기 작성" icon="/assets/open_in_new.svg" />
                </div>
            </div>
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
    );
}

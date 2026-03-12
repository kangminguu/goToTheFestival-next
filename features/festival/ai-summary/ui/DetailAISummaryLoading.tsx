import { AIIcon } from "@/components/Icons";

export default function DetailAISummaryLoading() {
    return (
        <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px] animate-pulse">
            <h2 className="md:text-[24px] text-[16px] font-semibold flex flex-row items-center">
                <AIIcon size={44} />
                AI 요약
            </h2>

            {/* 태그 */}
            <div className="flex flex-row gap-[6px] flex-wrap">
                <div className="h-[26px] w-[45px] bg-background-hover rounded" />
                <div className="h-[26px] w-[45px] bg-background-hover rounded" />
                <div className="h-[26px] w-[45px] bg-background-hover rounded" />
                <div className="h-[26px] w-[45px] bg-background-hover rounded" />
                <div className="h-[26px] w-[45px] bg-background-hover rounded" />
            </div>

            {/* 설명 */}
            <div className="md:h-[80px] h-[60px] w-full bg-background-hover rounded" />
        </div>
    );
}

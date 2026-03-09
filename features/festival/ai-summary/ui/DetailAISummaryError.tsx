import Button from "@/components/Button/Button";
import { AIIcon, RetryIcon } from "@/components/Icons";
import DetailAISummaryLoading from "./DetailAISummaryLoading";

export default function DetailAISummaryError({
    onRetry,
    isRetrying = false,
}: {
    onRetry: () => void;
    isRetrying: boolean;
}) {
    if (isRetrying) return <DetailAISummaryLoading />;

    return (
        <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px]">
            <h2 className="md:text-[24px] text-[16px] font-semibold flex flex-row items-center">
                <AIIcon size={44} />
                AI 요약
            </h2>

            <div className="w-full flex flex-col gap-[16px] justify-center items-center">
                <span className="text-font-secondary md:text-[16px] text-[15px] font-normal whitespace-pre-line">
                    AI 요약 정보를 불러오는 데 실패했습니다.
                </span>

                <div className="w-fit">
                    <Button onClick={onRetry}>
                        다시 시도
                        <RetryIcon size={14} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

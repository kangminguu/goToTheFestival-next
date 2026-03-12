"use client";

import { useEffect, useState } from "react";
import { AIIcon } from "@/components/Icons";
import AISummaryTag from "./AISummaryTag";
import {
    AISummary,
    AISummaryRequestFestivalInfo,
} from "@/features/festival/ai-summary/model/types";
import { useAISummaryQuery } from "@/features/festival/ai-summary/hooks/useAISummaryQuery";
import DetailAISummaryLoading from "./DetailAISummaryLoading";
import DetailAISummaryError from "./DetailAISummaryError";

export default function DetailAISummarySection({
    contentId,
    festivalInfo,
}: {
    contentId: string;
    festivalInfo: AISummaryRequestFestivalInfo;
}) {
    const {
        data: summary,
        isLoading,
        isError,
        refetch,
        isRefetching,
    } = useAISummaryQuery(contentId, festivalInfo);

    if (isLoading) return <DetailAISummaryLoading />;

    if (isError || !summary)
        return (
            <DetailAISummaryError onRetry={refetch} isRetrying={isRefetching} />
        );

    return (
        <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px]">
            <h2 className="md:text-[24px] text-[16px] font-semibold flex flex-row items-center">
                <AIIcon size={44} />
                AI 요약
            </h2>

            {/* 태그 */}
            <div className="flex flex-row gap-[6px] flex-wrap">
                {summary.tags.length > 0
                    ? summary.tags.map((tag, index) => (
                          <AISummaryTag key={index}>{tag}</AISummaryTag>
                      ))
                    : "태그 정보가 없습니다."}
            </div>

            {/* 설명 */}
            <p className="text-font-secondary md:text-[16px] text-[15px] font-normal whitespace-pre-line">
                {summary.summary_text}
            </p>
        </div>
    );
}

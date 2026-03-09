import OpenAI from "openai";
import { createClient } from "@/lib/utils/server";
import { AISummaryRequestFestivalInfo } from "../model/types";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function getAISummary(
    contentid: string,
    festivalInfo: AISummaryRequestFestivalInfo,
) {
    const supabase = await createClient();

    const { data: existingSummary } = await supabase
        .from("festival_ai_summaries")
        .select("summary_text, tags")
        .eq("contentid", contentid)
        .single();

    if (existingSummary) return existingSummary;

    const sourceText = [
        festivalInfo.overview,
        festivalInfo.introText,
        festivalInfo.eventText,
    ]
        .filter(Boolean)
        .join("\n\n");

    const prompt = `
        당신은 축제 정보를 정리하는 콘텐츠 에디터입니다.

        주어진 축제 정보를 바탕으로 아래 작업을 수행하세요.

        작업:
        1. 축제 내용을 2~3줄로 자연스럽게 요약합니다.
        2. 축제의 특징을 나타내는 태그를 3~6개 생성합니다.

        작성 규칙:
        - 한국어 사용
        - 존댓말 사용
        - 실제 후기나 소개글 스타일로 자연스럽게 작성
        - 인터넷에 일반적으로 있는 축제 후기 스타일을 참고해 작성
        - 태그는 핵심 키워드 중심 (예: 지역명, 체험, 공연, 역사, 야시장 등)
        - 불필요한 설명이나 문장은 절대 추가하지 말 것

        입력 정보:
        축제명: ${festivalInfo.title}
        주소: ${festivalInfo.addr1 ?? "정보 없음"}
        장소: ${festivalInfo.eventPlace ?? "정보 없음"}
        기간: ${festivalInfo.eventStartDate ?? "정보 없음"} ~ ${festivalInfo.eventEndDate ?? "정보 없음"}
        본문: ${sourceText || "정보 없음"}

        출력 형식(JSON만 출력):
        {"summary":"...", "tags":["...", "...", "..."]}
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.7,
            messages: [{ role: "user", content: prompt }],
        });

        const content = completion.choices[0]?.message?.content ?? "";
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) return null;

        const parsed = JSON.parse(jsonMatch[0]);
        const summary_text = parsed.summary;
        const tags = parsed.tags;

        if (!summary_text || !Array.isArray(tags)) return null;

        const { error: insertError } = await supabase
            .from("festival_ai_summaries")
            .insert({
                contentid,
                summary_text,
                tags,
            });

        if (insertError) return null;

        return { summary_text, tags };
    } catch (error) {
        console.error("AI 요약 생성 실패:", error);
        return null;
    }
}

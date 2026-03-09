/** AI 요약 return 타입 */
export type AISummary = {
    summary_text: string;
    tags: string[];
};

export type AISummaryRequestFestivalInfo = {
    title: string;
    overview?: string;
    addr1?: string;
    introText?: string;
    eventText?: string;
    eventStartDate?: string;
    eventEndDate?: string;
    eventPlace?: string;
};

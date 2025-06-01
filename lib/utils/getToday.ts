/**
 * getToday
 * @returns YYYYMMDD 형식으로 오늘 날짜를 반환합니다. (KST 기준)
 */
export default function getToday(): string {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("ko-KR", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    const [year, month, day] = formatter
        .format(now)
        .replace(/\. /g, "-")
        .replace(".", "")
        .split("-");
    return `${year}${month}${day}`;
}

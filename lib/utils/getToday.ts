/**
 * getToday
 * @returns YYYYMMDD 형식으로 오늘 날짜를 반환합니다.
 */
export default function getToday(): string {
    const date = new Date().toISOString().split("T")[0].split("-"); // 2025-05-28T15:47:24.767Z to 20250528 형식으로
    const today = date.join("");

    return today;
}

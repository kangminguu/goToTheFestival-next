/**
 * convertSelectedDateText : 날짜 포멧을 MM.DD (e) 형식으로 바꿉니다.
 * @param date : Date타입의 날짜
 * @returns MM.DD (e)
 */
export const convertSelectedDateText = (date: Date) => {
    const dayKor = ["일", "월", "화", "수", "목", "금", "토"];
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekday = dayKor[date.getDay()];
    return `${month}.${day} (${weekday})`;
};

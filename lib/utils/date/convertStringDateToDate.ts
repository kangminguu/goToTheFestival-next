/**
 * YYYY-MM-DD 형식의 문자열을 Date 객체로 변환하는 함수
 */
export default function convertStringDateToDate(stringDate: string) {
    const splitDate = stringDate.split("-");

    const year = Number(splitDate[0]);
    const month = Number(splitDate[1]) - 1;
    const day = Number(splitDate[2]);

    return new Date(year, month, day);
}

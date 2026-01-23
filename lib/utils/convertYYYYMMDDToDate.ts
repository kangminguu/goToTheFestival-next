export default function convertYYYYMMDDToDate(YYYYMMDD: string) {
    const splitDate = YYYYMMDD.split("-");

    const year = Number(splitDate[0]);
    const month = Number(splitDate[1]) - 1;
    const day = Number(splitDate[2]);

    return new Date(year, month, day);
}

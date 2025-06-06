export default function convertYYYYMMDDToDate(YYYYMMDD: string) {
    const year = parseInt(YYYYMMDD.slice(0, 4), 10);
    const month = parseInt(YYYYMMDD.slice(4, 6), 10) - 1;
    const day = parseInt(YYYYMMDD.slice(6, 8), 10);
    return new Date(year, month, day);
}

export default function getLastDayOfMonth(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const lastDate = new Date(year, now.getMonth() + 1, 0).getDate().toString();

    return `${year}${month}${lastDate}`;
}

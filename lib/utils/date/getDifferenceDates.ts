export default function getDifferenceDates(startDate: Date, endDate: Date) {
    const startUTC = Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
    );
    const endUTC = Date.UTC(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
    );

    const dayInMs = 1000 * 60 * 60 * 24;
    return Math.floor((endUTC - startUTC) / dayInMs);
}

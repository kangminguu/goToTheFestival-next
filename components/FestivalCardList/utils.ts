export const sortByDate = (festivalList) => {
    const sortFestivalList = [...festivalList].sort(
        (a, b) => parseInt(a.eventstartdate) - parseInt(b.eventstartdate)
    );

    return sortFestivalList;
};

export const sortByDistance = (festivalList) => {
    return festivalList;
};

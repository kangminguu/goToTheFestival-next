export const sortByDate = (festivalList) => {
    const sortFestivalList = [...festivalList].sort(
        (a, b) => parseInt(a.eventstartdate) - parseInt(b.eventstartdate)
    );

    return sortFestivalList;
};

export const sortByDistance = async (festivalList: any[]) => {
    const getCurrentLocation = (): Promise<{ x: number; y: number }> => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    resolve({
                        x: pos.coords.longitude, // 경도
                        y: pos.coords.latitude, // 위도
                    });
                },
                () => reject(new Error("위치 정보를 가져오지 못했습니다.")),
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 10000,
                }
            );
        });
    };

    const userLocation = await getCurrentLocation().catch(() => ({
        x: 126.976889,
        y: 37.572793,
    }));

    const getDistance = (
        p1: { x: number; y: number },
        p2: { x: number; y: number }
    ) => {
        const dx = parseFloat(p1.x.toString()) - parseFloat(p2.x.toString());
        const dy = parseFloat(p1.y.toString()) - parseFloat(p2.y.toString());
        return Math.sqrt(dx * dx + dy * dy);
    };

    return [...festivalList].sort((a, b) => {
        return (
            getDistance(userLocation, { x: a.mapx, y: a.mapy }) -
            getDistance(userLocation, { x: b.mapx, y: b.mapy })
        );
    });
};

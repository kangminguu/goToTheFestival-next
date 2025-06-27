"use client";

import { useEffect } from "react";
import FestivalCardList from "../../components/FestivalCardList/FestivalCardList";

export default function FavoritesPage() {
    useEffect(() => {
        document.title = "찜한 축제 - 축제가자";
    }, []);

    return (
        <div className="min-max-padding min-h-[400px] md:min-h-[600px] mt-[20px] md:mt-[60px]">
            <FestivalCardList listType="favorite" />
        </div>
    );
}

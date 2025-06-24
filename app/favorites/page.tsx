"use client";

import { useEffect } from "react";
import EmptyFavoriteList from "./components/EmptyFavoriteList";
import FavoriteList from "./components/FavoriteList";
import { useFavoriteStore } from "../../stores";

export default function FavoritesPage() {
    const { favorites } = useFavoriteStore();

    useEffect(() => {
        document.title = "찜한 축제 - 축제가자";
    }, []);


    if (Object.keys(favorites).length === 0) return (
        <div className="min-max-padding min-h-[400px] md:min-h-[600px]">
            <EmptyFavoriteList />
        </div>
    );

    return (
        <div className="min-max-padding min-h-[400px] md:min-h-[600px]">
            <FavoriteList favorites={favorites} />
        </div>
    );
}
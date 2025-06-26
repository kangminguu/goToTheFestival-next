"use client";

import { useEffect } from "react";
import EmptyFavoriteList from "./components/EmptyFavoriteList";
import FavoriteList from "./components/FavoriteList";
import { useFavoriteStore } from "../../stores";

export default function FavoritesPage() {
    useEffect(() => {
        document.title = "찜한 축제 - 축제가자";
    }, []);

    return (
        <div className="min-max-padding min-h-[400px] md:min-h-[600px]">
            <FavoriteList />
        </div>
    );
}

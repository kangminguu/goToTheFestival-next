"use client";

import { useFavoriteStore } from "../../stores";
import { FavoriteIcon } from "../Icons";

type FavoriteButtonSizeType = "card" | "detailPage";

interface FavoriteButtonProps {
    contentid: string;
    sizeType?: FavoriteButtonSizeType;
}

const styles = {
    card: {
        button: "absolute group md:w-[30px] w-[24px] top-[5px] right-[5px] md:top-[10px] md:right-[10px]",
    },
    detailPage: { button: "group w-[30px]" },
};

export default function FavoriteButton({
    contentid,
    sizeType = "card",
}: FavoriteButtonProps) {
    const { button } = styles[sizeType];
    const { favorites, clickFavorite } = useFavoriteStore();

    const handleFavorite = () => {
        clickFavorite(contentid);
    };

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleFavorite();
            }}
            className={`${button}`}
        >
            {favorites.includes(contentid) ? (
                <div className="group text-[#FF4238]">
                    <FavoriteIcon size={30} />
                </div>
            ) : (
                <div className="group text-[#333333] hover:text-[#FF4238]">
                    <FavoriteIcon size={30} opacity={0.5}/>
                </div>
            )}
        </button>
    );
}

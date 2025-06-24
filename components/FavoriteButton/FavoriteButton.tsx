"use client";

import { useFavoriteStore } from "../../stores";

type FavoriteButtonSizeType = "card" | "detailPage";

interface FavoriteButtonProps {
    contentid: string;
    firstimage: string;
    firstimage2: string;
    title: string;
    eventstartdate: string;
    eventenddate: string;
    addr1: string;
    sizeType?: string;
}

const styles = {
    card: {
        button: "absolute group md:w-[30px] w-[24px] top-[5px] right-[5px] md:top-[10px] md:right-[10px]",
    },
    detailPage: { button: "group w-[30px]" },
};

export default function FavoriteButton({
    contentid,
    firstimage,
    firstimage2,
    title,
    eventstartdate,
    eventenddate,
    addr1,
    sizeType = "card",
}: FavoriteButtonProps) {
    const { button } = styles[sizeType];
    const { favorites, clickFavorite } = useFavoriteStore();

    const handleFavorite = () => {
        clickFavorite({
            contentid,
            firstimage,
            firstimage2,
            title,
            eventstartdate,
            eventenddate,
            addr1,
        });
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
            {Object.keys(favorites).includes(contentid) ? (
                <img
                    src="/assets/favorite/favorite_active.svg"
                    alt="favorite"
                />
            ) : (
                <>
                    <img
                        src="/assets/favorite/favorite.svg"
                        alt="favorite"
                        className="group-hover:hidden block"
                    />
                    <img
                        src="/assets/favorite/favorite_hover.svg"
                        alt="favorite"
                        className="hidden group-hover:block"
                    />
                </>
            )}
        </button>
    );
}

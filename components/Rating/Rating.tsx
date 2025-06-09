type ratingType = "card" | "detailPage" | "ratingSection" | "rating";

interface RatingProps {
    rating?: number;
    sizeType?: ratingType;
}

const styles = {
    card: {
        div: "",
        img: "w-[15px] md:w-[20px]",
        text: "md:text-[15px] text-[14px]",
    },
    detailPage: {
        div: "",
        img: "",
        text: "",
    },
    ratingSection: {
        div: "",
        img: "",
        text: "",
    },
    rating: {
        div: "",
        img: "",
        text: "",
    },
};

export default function Rating({ rating = 0, sizeType = "card" }: RatingProps) {
    const { div, img, text } = styles[sizeType];

    return (
        <div className="row-center gap-[5px]">
            <div className={`row-center`}>
                {Array.from({ length: rating }, (_, i) => (
                    <img
                        key={i}
                        src="/assets/flame/flame.svg"
                        alt="rating"
                        className={`${img} hidden md:block`}
                    />
                ))}

                {Array.from({ length: 5 - Math.floor(rating) }, (_, i) => (
                    <img
                        key={rating + i}
                        src="/assets/flame/flame_gray.svg"
                        alt="rating"
                        className={`${img} hidden md:block`}
                    />
                ))}

                <img
                    src="/assets/flame/flame.svg"
                    alt="rating"
                    className={`${img} md:hidden block`}
                />
            </div>

            <span className={`text-font-secondary ${text}`}>
                {rating.toFixed(1)}
            </span>
        </div>
    );
}

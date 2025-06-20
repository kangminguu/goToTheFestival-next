type ratingType = "card" | "detailPage" | "ratingSection" | "rating";

interface RatingProps {
    rating?: number;
    sizeType?: ratingType;
}

const styles = {
    card: {
        div: "",
        spread_img: "w-[15px] md:w-[20px] hidden md:block",
        img: "w-[15px] md:w-[20px] md:hidden block",
        text: "md:text-[15px] text-[14px]",
    },
    detailPage: {
        div: "",
        spread_img: "hidden",
        img: "md:w-[24px] w-[20px]",
        text: "md:text-[16px] text-[14px]",
    },
    ratingSection: {
        div: "",
        spread_img: "",
        img: "",
        text: "",
    },
    rating: {
        div: "",
        spread_img: "",
        img: "",
        text: "",
    },
};

export default function Rating({ rating = 0, sizeType = "card" }: RatingProps) {
    const { div, spread_img, img, text } = styles[sizeType];

    return (
        <div className="row-center gap-[5px]">
            <div className={`row-center`}>
                {/* 펼쳐진 평점 */}
                {Array.from({ length: rating }, (_, i) => (
                    <img
                        key={i}
                        src="/assets/flame/flame.svg"
                        alt="rating"
                        className={`${spread_img}`}
                    />
                ))}
                {Array.from({ length: 5 - Math.floor(rating) }, (_, i) => (
                    <img
                        key={rating + i}
                        src="/assets/flame/flame_gray.svg"
                        alt="rating"
                        className={`${spread_img}`}
                    />
                ))}

                {/* 접힌 평점 */}
                <img
                    src="/assets/flame/flame.svg"
                    alt="rating"
                    className={`${img}`}
                />
            </div>

            <span className={`text-font-secondary ${text}`}>
                {rating.toFixed(1)}
            </span>
        </div>
    );
}

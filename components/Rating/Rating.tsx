import { FireIcon } from "../Icons";

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
        text: "md:text-[15px] text-[14px] text-font-secondary",
    },
    detailPage: {
        div: "",
        spread_img: "hidden",
        img: "md:w-[24px] w-[20px]",
        text: "md:text-[16px] text-[14px] text-font-secondary",
    },
    ratingSection: {
        div: "",
        spread_img: "md:w-[24px] w-[15px]",
        img: "hidden",
        text: "text-[12px] md:text-[14px] text-font-secondary",
    },
    rating: {
        div: "",
        spread_img: "hidden",
        img: "w-[24px]",
        text: "text-[18px] font-semibold",
    },
};

export default function Rating({ rating = 0, sizeType = "card" }: RatingProps) {
    const { div, spread_img, img, text } = styles[sizeType];

    return (
        <div className="row-center gap-[5px]">
            <div className={`row-center`}>
                {/* 펼쳐진 평점 */}
                {Array.from({ length: rating }, (_, i) => (
                    <div key={i} className={`${spread_img}`}>
                        <FireIcon size={24} color="#FF4238" />
                    </div>
                ))}
                {Array.from({ length: 5 - Math.floor(rating) }, (_, i) => (
                    <div key={i} className={`${spread_img}`}>
                        <FireIcon size={24} color="#EBEBEB" />
                    </div>
                ))}

                {/* 접힌 평점 */}
                <div className={`${img}`}>
                    <FireIcon size={24} color="#FF4238" />
                </div>
            </div>

            <span className={`text-center ${text}`}>{rating.toFixed(1)}</span>
        </div>
    );
}

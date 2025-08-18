export default function RatingButtons({ rating, setRating }) {
    const handleClickRating = (rate: number) => {
        setRating(rate);
    };

    return (
        <div className="row-center justify-center">
            {[1, 2, 3, 4, 5].map((rate) => (
                <button key={rate} onClick={() => handleClickRating(rate)}>
                    <img
                        src={
                            rate <= rating
                                ? "/assets/flame/flame.svg"
                                : "/assets/flame/flame_gray.svg"
                        }
                        alt="rating"
                        className="w-[40px]"
                    />
                </button>
            ))}
        </div>
    );
}

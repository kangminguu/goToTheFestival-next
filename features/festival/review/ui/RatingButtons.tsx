import { FireIcon } from "@/components/Icons";

export default function RatingButtons({ rating, setRating }: any) {
    const handleClickRating = (rate: number) => {
        setRating(rate);
    };

    return (
        <div className="row-center justify-center">
            {[1, 2, 3, 4, 5].map((rate) => (
                <button key={rate} onClick={() => handleClickRating(rate)}>
                    {rate <= rating ? (
                        <FireIcon size={40} color="#FF4238" />
                    ) : (
                        <FireIcon size={40} color="#EBEBEB" />
                    )}
                </button>
            ))}
        </div>
    );
}

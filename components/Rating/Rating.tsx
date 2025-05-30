type ratingType = 0 | 1 | 2 | 3 | 4 | 5;

interface RatingProps {
    rating?: ratingType;
    size?: number;
}

export default function Rating({ rating = 0, size = 24 }: RatingProps) {
    const ratingSize = `h-[${String(size)}px]`;

    return (
        <div className={`flex flex-row ${ratingSize}`}>
            {Array.from({ length: rating }, (_, i) => (
                <img key={i} src="/assets/flame/flame.svg" alt="rating" />
            ))}

            {Array.from({ length: 5 - rating }, (_, i) => (
                <img
                    key={rating + i}
                    src="/assets/flame/flame_gray.svg"
                    alt="rating"
                />
            ))}
        </div>
    );
}

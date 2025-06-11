interface SortSelectorProps {
    sortOption: "date" | "distance";
    setSortOption: (option: "date" | "distance") => void;
}

export default function SortSelector({
    sortOption,
    setSortOption,
}: SortSelectorProps) {
    return (
        <div className="font-semibold flex flex-row justify-end gap-[8px] mr-[20px]">
            <button
                onClick={() => setSortOption("date")}
                className={`${
                    sortOption === "date"
                        ? "text-font-highlight"
                        : "text-font-secondary"
                }`}
            >
                날짜순
            </button>

            <span className="text-border-base">|</span>

            <button
                onClick={() => setSortOption("distance")}
                className={`${
                    sortOption === "distance"
                        ? "text-font-highlight"
                        : "text-font-secondary"
                }`}
            >
                거리순
            </button>
        </div>
    );
}

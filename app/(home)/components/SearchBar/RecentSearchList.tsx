import { useSearchStore } from "../../../../stores/index";
import RecentSearchItem from "./RecentSearchItem";

export default function RecentSearchList() {
    const { keywords } = useSearchStore();

    return (
        <div className="flex flex-wrap gap-[7px]">
            {keywords.map((value, index) => (
                <RecentSearchItem key={index} keyword={value} />
            ))}
        </div>
    );
}

import { useInputValueStore, useSearchStore } from "../../../../stores/index";

export default function RecentSearchItem({ keyword }: { keyword: string }) {
    const { setInputValue } = useInputValueStore();
    const { delKeyword } = useSearchStore();

    return (
        <button className="row-center gap-[2px]">
            <span
                onClick={() => setInputValue(keyword)}
                className="font-semibold text-[14px] text-font-secondary"
            >
                {keyword}
            </span>
            <img
                src="/assets/closed/closed.svg"
                alt="delete"
                className="h-[12px] w-[12px]"
                onClick={() => delKeyword(keyword)}
            />
        </button>
    );
}

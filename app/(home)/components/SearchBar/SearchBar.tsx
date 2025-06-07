"use client";

import { useState } from "react";
import { useSearchStore } from "../../../../stores/useSearchStore";
import RecentSearchList from "./RecentSearchList";
import { useInputValueStore } from "../../../../stores/useInputValue";

export default function SearchBar() {
    const { inputValue, setInputValue } = useInputValueStore();
    const { addKeyword, delKeyword } = useSearchStore();

    // 검색 폼 제출 이벤트
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimed = inputValue.trim();

        if (!trimed) return;

        console.log(trimed);

        delKeyword(trimed);
        addKeyword(trimed);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full h-[58px]">
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                className="absolute w-full pl-[20px] pr-[80px] py-[16px] border border-border-base rounded-[8px] font-pretendard text-font-primary text-[16px] font-medium hover:bg-background-hover animation-color"
                placeholder="관심있는 지역이나 축제를 검색해보세요."
                maxLength={20}
            />

            {inputValue !== "" ? (
                <button
                    type="button"
                    onClick={() => setInputValue("")}
                    className="absolute h-[15px] w-[15px] right-[60px] top-1/2 -translate-y-1/2 flex justify-center items-center bg-font-muted rounded-full"
                >
                    <img
                        src="/assets/closed/closed_white.svg"
                        alt="delete"
                        className="h-[12px] w-[12px]"
                    />
                </button>
            ) : null}

            <button
                type="submit"
                className="absolute h-full right-[20px] top-1/2 -translate-y-1/2"
            >
                <img
                    src="/assets/search.svg"
                    alt="search"
                    className="h-[24px]"
                />
            </button>

            <div className="absolute top-[65px] left-[20px]">
                <RecentSearchList />
            </div>
        </form>
    );
}

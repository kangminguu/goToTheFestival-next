"use client";

import { ArrowIcon } from "../Icons";

export default function BackToTopButton() {
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="fixed z-50 bottom-[30px] right-[30px] w-[57px] h-[57px] rounded-full">
            <button
                onClick={handleScrollTop}
                className="col-center justify-center w-[57px] h-[57px] rounded-full bg-background-base shadow-window border border-border-base"
            >
                <div className="-rotate-90">
                    <ArrowIcon size={24} color="#767676" />
                </div>
                <span className="relative text-[12px] top-[-5px]">위로</span>
            </button>
        </div>
    );
}

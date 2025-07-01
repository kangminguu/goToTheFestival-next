"use client";

export default function BackToTopButton() {
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="sticky z-50 bottom-[30px] min-max-padding flex justify-end pb-[10px]">
            <button
                onClick={handleScrollTop}
                className="col-center justify-center w-[57px] h-[57px] rounded-full bg-background-base shadow-window border border-border-base"
            >
                <img
                    className="rotate-90"
                    src="/assets/arrow/arrow_gray.svg"
                    alt="위로"
                />
                <span className="relative text-[12px] top-[-5px]">위로</span>
            </button>
        </div>
    );
}

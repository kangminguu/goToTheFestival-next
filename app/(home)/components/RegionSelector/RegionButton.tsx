"use client";

interface RegionButtonProps {
    isSelect?: boolean;
    region: string;
    onClick?: () => void;
}

export default function RegionButton({
    isSelect = false,
    region,
    onClick,
}: RegionButtonProps) {
    const style = {
        button: isSelect
            ? "bg-background-highlight border-background-highlight animation-color"
            : "bg-background-base border-border-base hover:bg-background-hover animation-color",
        span: isSelect ? "text-font-inverted" : "text-font-primary",
    };

    return (
        <button
            onClick={onClick}
            className={`rounded-full border md:px-[26px] px-[20px] md:py-[9px] py-[6px] flex items-center ${style.button}`}
        >
            <span
                className={`font-pretendard font-medium md:text-[16px] text-[14px] whitespace-nowrap ${style.span}`}
            >
                {region}
            </span>
        </button>
    );
}

import { ReactNode } from "react";

interface ButtonParams {
    children?: ReactNode;
    title?: string;
    icon?: string;
    isBorder?: boolean;
    onClick?: () => void;
}

/**
 * 기본 버튼 컴포넌트
 */
export default function Button({
    children,
    title,
    icon,
    isBorder = false,
    onClick,
}: ButtonParams) {
    const baseClass = "px-[14px] py-[10px] rounded-button";
    const fontStyle =
        "font-pretendard font-semibold text-[14px] text-font-primary";
    const backgroundStyle = "hover-active";
    const borderStyle = "border border-border-base";

    return (
        <button
            onClick={onClick}
            className={`flex flex-row items-center justify-center gap-[6px] text-center ${baseClass} ${fontStyle} ${backgroundStyle} ${
                isBorder ? borderStyle : ""
            }`}
        >
            {icon ? (
                <img src={icon} alt={icon} className=" w-[15px] h-[15px]" />
            ) : null}
            {title}
            {children}
        </button>
    );
}

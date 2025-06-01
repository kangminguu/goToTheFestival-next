interface ButtonParams {
    title: string;
    isBorder?: boolean;
    onClick?: () => void;
}

/**
 * 기본 버튼 컴포넌트
 * @param title
 * @param event
 */
export default function Button({
    title,
    isBorder = false,
    onClick,
}: ButtonParams) {
    const baseClass = "px-[14px] py-[10px] rounded-button";
    const fontStyle =
        "font-pretendard font-semibold text-[14px] text-font-primary";
    const backgroundStyle =
        "bg-background-base hover:bg-background-hover transition-colors duration-300 ease-in-out";
    const borderStyle = "border border-border-base border-[1px]";

    return (
        <button
            onClick={onClick}
            className={`${baseClass} ${fontStyle} ${backgroundStyle} ${
                isBorder ? borderStyle : ""
            }`}
        >
            {title}
        </button>
    );
}

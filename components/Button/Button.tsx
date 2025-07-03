interface ButtonParams {
    title: string;
    icon?: string;
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
    icon,
    isBorder = false,
    onClick,
}: ButtonParams) {
    const baseClass = "px-[14px] py-[10px] rounded-button";
    const fontStyle =
        "font-pretendard font-semibold text-[14px] text-font-primary";
    const backgroundStyle =
        "hover-active";
    const borderStyle = "border border-border-base";

    return (
        <button
            onClick={onClick}
            className={`row-center gap-[6px] ${baseClass} ${fontStyle} ${backgroundStyle} ${
                isBorder ? borderStyle : ""
            }`}
        >
            {icon ? (
                <img src={icon} alt={icon} className=" w-[15px] h-[15px]" />
            ) : null}
            {title}
        </button>
    );
}

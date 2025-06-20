interface IconIntroductionProps {
    icon: string;
    introduction: string;
}

export default function IconIntroduction({
    icon,
    introduction,
}: IconIntroductionProps) {
    const formatIntroduction =
        introduction !== ""
            ? introduction.replace(/<br\s*\/?>/gi, "<br>").split("<br>") // <Br>의 경우도 <br>로 바꿔줘서 처리할 수 있도록
            : [introduction];

    if (introduction === "") return null;

    return (
        <div className="flex flex-row items-start md:gap-[10px] gap-[5px]">
            <div className="h-[22px] md:h-[27px] row-center">
                <img
                    src={`${icon}`}
                    alt={`${icon}`}
                    className="md:w-[20px] w-[15px]"
                />
            </div>
            <div className="flex flex-col gap-[3px]">
                {formatIntroduction.map((item, index) => (
                    <p key={index} className="md:text-[18px] text-[15px]">
                        {item.trim()}
                    </p>
                ))}
            </div>
        </div>
    );
}

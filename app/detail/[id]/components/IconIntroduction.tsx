import { convertBr } from "../../../../lib/utils";

interface IconIntroductionProps {
    icon: string;
    introduction: string;
}

export default function IconIntroduction({
    icon,
    introduction,
}: IconIntroductionProps) {
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
            <p className="md:text-[18px] text-[15px] whitespace-pre-line">
                {convertBr(introduction)}
            </p>
        </div>
    );
}

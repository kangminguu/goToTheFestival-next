import React, { useEffect, useRef, useState } from "react";

interface ReadMoreProps {
    content: React.ReactNode;
}

type readmoreType = "더보기" | "접기";

export default function ReadMore({ content }: ReadMoreProps) {
    const [readmore, setReadmore] = useState<readmoreType>("더보기");

    const refContentHeight = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (refContentHeight.current) {
            setHeight(refContentHeight.current.offsetHeight);
        }
    }, []);

    const handleClick = () => {
        if (readmore === "더보기") setReadmore("접기");
        if (readmore === "접기") setReadmore("더보기");
    };

    return (
        <div className="relative overflow-hidden">
            <div
                className={`h-fit ${
                    readmore === "더보기" ? "max-h-[250px]" : "max-h-fit"
                }`}
            >
                <div ref={refContentHeight} className="h-fit">
                    {content}
                </div>
            </div>

            {/* 더보기/접기 버튼 */}
            {height > 250 ? (
                <div
                    className={`${
                        readmore === "더보기"
                            ? "absolute h-[100px]"
                            : "relative h-[50px]"
                    } bottom-0 w-full col-center justify-end`}
                    style={{
                        backgroundImage:
                            readmore === "더보기"
                                ? "linear-gradient(to top, white 10%, transparent 100%)"
                                : "",
                    }}
                >
                    <button
                        onClick={handleClick}
                        className="font-semibold text-[14px] w-fit"
                    >
                        {readmore}
                    </button>
                </div>
            ) : null}
        </div>
    );
}

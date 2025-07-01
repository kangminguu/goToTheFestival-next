"use client";

import Link from "next/link";
import Button from "../../../components/Button/Button";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
    useEffect(() => {
        console.error("에러 발생:", error);

        document.title = "오류가 발생한 페이지입니다";
    }, [error]);

    return (
        <div className="min-max-padding min-h-[400px] md:min-h-[600px] col-center gap-[10px] justify-center">
            <div className="col-center relative drag-prevent">
                <span className="text-[64px] font-bold text-border-base">
                    500
                </span>
                <img
                    src="/assets/unconnected.png"
                    className="w-[180px] absolute top-[64px]"
                    alt="unconnected"
                />
            </div>

            <span className="">오류가 발생한 페이지입니다.</span>

            <span className="text-center text-[14px] text-font-secondary">
                서버에 문제가 발생했습니다.
                <br />
                또는 존재하지 않은 축제이거나 삭제, 변경된 축제입니다.
            </span>

            <Link href="/" className="mt-[20px]">
                <Button
                    title="홈으로 돌아가기"
                    icon="/assets/undo.svg"
                    isBorder
                />
            </Link>
        </div>
    );
}

import { Metadata } from "next";
import Link from "next/link";
import Button from "../components/Button/Button";

export const metadata: Metadata = {
    title: "페이지를 찾을 수 없습니다 - 축제가자",
    icons: {
        icon: "./icon.svg",
    },
};

export default function NotFound() {
    return (
        <div className="min-max-padding min-h-[400px] md:min-h-[600px] col-center gap-[10px] justify-center">
            <div className="col-center relative drag-prevent">
                <span className="text-[64px] font-bold text-border-base">
                    404
                </span>
                <img
                    src="/assets/unconnected.png"
                    className="w-[180px] absolute top-[64px]"
                    alt="unconnected"
                />
            </div>

            <span>페이지를 찾을 수 없습니다.</span>

            <span className="text-center text-[14px] text-font-secondary">
                주소가 잘못 입력되었거나, 변경 또는 삭제되어
                <br />
                요청하신 페이지를 찾을 수 없습니다.
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

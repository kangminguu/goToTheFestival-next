import Link from "next/link";
import Button from "../components/Button/Button";

export default function NotFound() {
    return (
        <div className="min-max-padding min-h-[400px] md:min-h-[600px] col-center gap-[10px] justify-center">
            <img
                src="/assets/error_page.svg"
                className="w-[180px]"
                alt="error_page"
            />

            <p>{"더 이상 존재하지 않거나 오류가 발생한 페이지입니다."}</p>

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

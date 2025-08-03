import Link from "next/link";
import Button from "../../components/Button/Button";

export function generateMetadata() {
    return {
        title: "로그인 - 축제가자",
    };
}

export default function LoginPage() {
    return (
        <div className="min-max-padding min-h-[400px] md:min-h-[600px] col-center justify-center gap-[10px]">
            <span className="text-border-base text-[56px]">( 乂˙-˙)</span>
            <h2>로그인/회원가입 기능은 준비 중이에요.</h2>
            <p className="text-center text-[14px] text-font-secondary">
                서비스가 정식 오픈되면 축제에 대한 평가를 남기고,
                <br />
                다른 기기에서도 찜한 축제를 자유롭게 관리하실 수 있어요.
            </p>

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

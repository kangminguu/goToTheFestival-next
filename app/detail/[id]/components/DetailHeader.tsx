"use client";

import Button from "../../../../components/Button/Button";
import { usePathname, useRouter } from "next/navigation";
import { useAlertStore } from "../../../../stores/useAlertStore";

export default function DetailHeader() {
    const router = useRouter();

    const domain = "https://gotofestival.vercel.app/";
    const urlPath = usePathname();

    const { open, close } = useAlertStore();

    const handleCopy = async () => {
        close();

        try {
            await navigator.clipboard.writeText(`${domain}${urlPath}`);
            open("클립보드에 복사되었습니다.");
        } catch {
            open("URL 복사에 실패했습니다.");
        }
    };

    return (
        <div className="row-center justify-between md:my-[20px] mb-[10px]">
            <button
                onClick={() => router.back()}
                className="row-center font-semibold"
            >
                <img
                    src="/assets/arrow/arrow.svg"
                    alt="뒤로"
                    className="w-[24px] h-[24px]"
                />
                뒤로
            </button>

            <Button
                title="URL 복사"
                icon="/assets/link.svg"
                onClick={handleCopy}
            />
        </div>
    );
}

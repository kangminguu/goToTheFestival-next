"use client";

import Button from "../../../../components/Button/Button";
import { usePathname, useRouter } from "next/navigation";
import { useAlertStore } from "../../../../stores/useAlertStore";

export default function DetailHeader() {
    const router = useRouter();

    const domain = process.env.NEXT_PUBLIC_BASE_URL;
    const urlPath = usePathname();

    const { open, close } = useAlertStore();

    //  URL 복사 이벤트
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
        <div className="row-center justify-end md:my-[20px] mb-[10px]">
            <Button
                title="URL 복사"
                icon="/assets/link.svg"
                onClick={handleCopy}
            />
        </div>
    );
}

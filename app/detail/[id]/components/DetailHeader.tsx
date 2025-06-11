"use client";

import Button from "../../../../components/Button/Button";
import { useRouter } from "next/navigation";

export default function DetailHeader() {
    const router = useRouter();
    return (
        <div className="row-center justify-between md:my-[20px] mb-[10px]">
            <button onClick={() => router.back()} className="row-center">
                <img
                    src="/assets/arrow.svg"
                    alt="뒤로"
                    className="w-[24px] h-[24px]"
                />
                뒤로
            </button>

            <Button
                title="URL 복사"
                icon="/assets/link.svg"
                onClick={() => {}}
                isBorder
            />
        </div>
    );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavButtonProps {
    url: string;
    text: string;
}

export default function NavButton({ url, text }: NavButtonProps) {
    const pathname = usePathname();
    const isActive = pathname === url;

    return (
        <Link href={url} className="col-center gap-[5px]">
            <div
                className={`w-[8px] h-[8px] rounded-full animation-color ${
                    isActive ? "bg-background-highlight" : "bg-background-base"
                }`}
            />
            <span
                className={`font-pretendard font-semibold md:hover:text-font-primary active:text-font-primary md:text-[20px] text-[16px] ${
                    isActive ? "text-font-primary" : "text-font-secondary"
                }`}
            >
                {text}
            </span>
        </Link>
    );
}

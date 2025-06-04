"use client";
import NavButton from "./NavButton";
import { usePathname } from "next/navigation";

export default function Navigation({
    mockPathname,
}: {
    mockPathname?: string;
}) {
    const realPathname = usePathname();
    const pathname = mockPathname ?? realPathname;

    const navPaths = ["/", "/favorites"];

    if (!navPaths.includes(pathname)) return null;

    return (
        <nav className="py-[10px]">
            <ul className="flex gap-[30px]">
                <li>
                    <NavButton url="/" text="지역별 축제" />
                </li>

                <li>
                    <NavButton url="/favorites" text="찜한 축제" />
                </li>
            </ul>
        </nav>
    );
}

import Link from "next/link";
import { MailIcon } from "../Icons";

export default function Footer() {
    const emailLink = "mailto:mingudat9909@gmail.com";

    return (
        <footer className="bg-background-hover py-[80px]">
            <div className="min-max-padding row-center justify-between">
                <div className="w-fit flex flex-1 flex-col items-start gap-[10px]">
                    <img
                        src="/assets/logo/logo_gray.svg"
                        alt="logo"
                        className="md:h-[26px] h-[18px]"
                    />

                    <div className="flex flex-col gap-[2px]">
                        <span className="font-normal md:text-[14px] text-[12px] text-font-muted">
                            Copyright © 2026, 축제가자. All rights reserved.
                        </span>

                        <div className="flex flex-row whitespace-normal break-words gap-[5px]">
                            <span className="font-normal md:text-[14px] text-[12px] text-font-muted">
                                Contact
                            </span>
                            <Link
                                href={emailLink}
                                className="flex flex-row items-center gap-[2px]"
                            >
                                <div className="w-[14px] md:w-[16px]">
                                    <MailIcon color="#D9D9D9" />
                                </div>
                                <span className="font-normal md:text-[14px] text-[12px] text-font-muted">
                                    mingudat9909@gmail.com
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

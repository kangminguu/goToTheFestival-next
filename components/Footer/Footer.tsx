import Link from "next/link";

export default function Footer() {
    const emailLink = "mailto:mingudat9909@gmail.com";
    const githubLink = "https://github.com/kangminguu";
    return (
        <footer className="bg-background-hover py-[50px]">
            <div className="min-max-padding row-center justify-between">
                <div className="w-fit flex flex-1 flex-col items-start gap-[10px]">
                    <img
                        src="/assets/logo/logo_gray.svg"
                        alt="logo"
                        className="md:h-[26px] h-[18px]"
                    />
                    <span className="font-pretendard font-normal md:text-[14px] text-[12px] text-font-muted">
                        Copyright © 2025, 축제가자. All rights reserved.
                    </span>
                </div>

                <div className="flex flex-1 flex-row whitespace-normal break-words justify-end gap-[32px]">
                    <Link href={emailLink} className="w-[32px] h-[32px]">
                        <img src="/assets/mail.svg" alt="email" />
                    </Link>

                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[32px] h-[32px]"
                    >
                        <img src="/assets/github.svg" alt="github" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

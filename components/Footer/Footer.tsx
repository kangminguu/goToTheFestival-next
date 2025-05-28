import Link from "next/link";

export default function Footer() {
    const emailLink = "mailto:mingudat9909@gmail.com";
    const githubLink = "https://github.com/kangminguu";
    return (
        <footer className="bg-background-hover py-[80px]">
            <div className="min-w-[320px] max-w-[1200px] mx-auto flex flex-row justify-between">
                <div className="w-fit flex flex-col items-start gap-[5px]">
                    <img
                        src="assets/logo_gray.svg"
                        alt="logo"
                        className="h-[28px]"
                    />
                    <p className="font-medium text-[14px] text-font-muted">
                        Copyright © 2025, 축제가자. All rights reserved.
                    </p>
                </div>

                <div className="flex flex-row gap-[32px]">
                    <Link href={emailLink} className="w-[32px]">
                        <img src="assets/mail.svg" alt="email" />
                    </Link>
                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[32px]"
                    >
                        <img src="assets/github.svg" alt="github" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

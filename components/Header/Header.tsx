import Link from "next/link";
import Button from "../Button/Button";
import Navigation from "./Navigation";

export default function Header({ mockPathname }: { mockPathname?: string }) {
    return (
        <header className="min-w-[320px] max-w-[1180px] mx-auto w-full px-[20px]">
            <div className="md:h-[76px] h-[56px] flex justify-between items-center">
                <Link href={`/`} className="md:h-[26px] h-[18px]">
                    <img
                        src="/assets/logo/logo.svg"
                        alt="logo"
                        className="h-full"
                    />
                </Link>

                {/* web */}
                <Link href={`/login`} className="hidden md:block">
                    <Button title="로그인/회원가입" />
                </Link>
                {/* mobile */}
                <Link href={`/login`} className="h-[30px] block md:hidden">
                    <img
                        src="assets/profile.svg"
                        alt="profile"
                        className="h-full"
                    />
                </Link>
            </div>

            <Navigation mockPathname={mockPathname} />
        </header>
    );
}

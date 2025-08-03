import Link from "next/link";
import Button from "../Button/Button";
import Navigation from "./Navigation";
import { createClient } from "../../lib/utils/server";

export default async function Header({
    mockPathname,
}: {
    mockPathname?: string;
}) {
    const supabase = createClient();
    const {
        data: { user },
    } = await (await supabase).auth.getUser();

    return (
        <header className="min-max-padding">
            <div className="md:h-[76px] h-[56px] flex justify-between items-center">
                <Link href={`/`} className="md:h-[26px] h-[18px]">
                    <img
                        src="/assets/logo/logo.svg"
                        alt="logo"
                        className="h-full"
                    />
                </Link>

                {user ? (
                    <Link href={`/mypage`} className="row-center gap-[7px]">
                        <Button title="마이페이지" />
                    </Link>
                ) : (
                    <Link href={`/login`}>
                        <Button title="로그인/회원가입" />
                    </Link>
                )}
            </div>

            <Navigation mockPathname={mockPathname} />
        </header>
    );
}

import Link from "next/link";
import Button from "../Button/Button";

export default function NavBar() {
    return (
        <header>
            <nav className="h-[76px] min-w-[320px] max-w-[1200px] mx-auto flex items-center justify-between">
                <Link href={`/`} className="h-[28px]">
                    <img src="assets/logo.svg" alt="logo" />
                </Link>

                <ul className="flex gap-[10px]">
                    <li>
                        <Button title="축제 검색" />
                    </li>
                    <li>
                        <Link href={`/favorites`}>
                            <Button title="찜한 축제" />
                        </Link>
                    </li>
                    <li>
                        <Link href={`/login`}>
                            <Button title="로그인/회원가입" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

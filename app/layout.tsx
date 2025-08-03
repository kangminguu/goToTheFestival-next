// import { Metadata } from "next";
import Alert from "../components/Alert/Alert";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import "./globals.css";

// export const metadata: Metadata = {
//     title: "축제가자",
//     icons: {
//         icon: "./icon.svg",
//     },
// };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className="flex flex-col justify-center min-h-screen">
                <Header />

                <main className="flex-1">{children}</main>

                <Footer />

                <Alert />

                <Modal />
            </body>
        </html>
    );
}

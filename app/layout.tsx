import Alert from "../components/Alert/Alert";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import "./globals.css";
import WriteReviewModal from "../features/festival/review/ui/WriteReviewModal";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";

export const metadata: Metadata = {
    verification: {
        other: {
            "naver-site-verification":
                "c0e1f9dba58d308e387de78793413ba2a6dc3630",
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <head>
                <link rel="apple-touch-icon" href="/apple_touch_icon.png" />
                <link rel="shortcut icon" href="/shortcut_icon.png" />
            </head>
            <body className="flex flex-col justify-center min-h-screen">
                <Header />

                <main className="flex-1">
                    <Providers>{children}</Providers>
                </main>

                <Footer />

                {/* 알람 */}
                <Alert />
                {/* 확인 모달창 */}
                <Modal />
                {/* 리뷰 쟉성/수정 모달창 */}
                <WriteReviewModal />

                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}

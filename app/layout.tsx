import Alert from "../components/Alert/Alert";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import "./globals.css";
import WriteReviewModal from "./detail/[id]/components/DetailRatingSection/WriteReviewModal";
import { Metadata } from "next";

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
            <body className="flex flex-col justify-center min-h-screen">
                <Header />

                <main className="flex-1">{children}</main>

                <Footer />

                {/* 알람 */}
                <Alert />
                {/* 확인 모달창 */}
                <Modal />
                {/* 리뷰 쟉성/수정 모달창 */}
                <WriteReviewModal />
            </body>
        </html>
    );
}

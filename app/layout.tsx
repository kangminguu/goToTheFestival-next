import Alert from "../components/Alert/Alert";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import "./globals.css";
import WriteReviewModal from "./detail/[id]/components/DetailRatingSection/WriteReviewModal";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
    verification: {
        other: {
            "naver-site-verification":
                "c0e1f9dba58d308e387de78793413ba2a6dc3630",
        },
    },
    openGraph: {
        title: "축제가자",
        description:
            "전국 방방곡곡에서 열리는 특별한 축제를 소개합니다. 지역별, 일정별로 쉽게 확인하고 나만의 축제 계획을 세워보세요!",
        url: "https://www.gotothefestival.co.kr",
        siteName: "축제가자",
        images: [
            {
                url: "https://www.gotothefestival.co.kr/gotothefestival.png", // ← 원하는 대표 이미지
                width: 1200,
                height: 630,
            },
        ],
        locale: "ko_KR",
        type: "website",
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

                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}

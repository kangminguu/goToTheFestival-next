import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className="flex flex-col min-h-screen">
                <NavBar />

                <main className="flex-1">{children}</main>

                <Footer />
            </body>
        </html>
    );
}

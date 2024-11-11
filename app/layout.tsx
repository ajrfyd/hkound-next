import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.css";
import "swiper/css";
import "swiper/css/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/global.min.css";
import "@/styles/theme.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Hkound",
  description: "2년차 개발자의 개인 블로그 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="d-flex flex-column">
        <Header />

        {children}
        <Footer />
      </body>
    </html>
  );
}

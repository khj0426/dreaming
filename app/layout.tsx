"use client";
import "../styles/globals.css";
import { Inter } from "next/font/google";

import AOS from "aos";
import "aos/dist/aos.css";

import AuthProvider from "./components/Next-Auth";
const inter = Inter({ subsets: ["latin"] });

// import KakaoLoginButton from "./components/kakaoLoginButton";
import Navbar from "./components/Navbar/Navbar";
import Script from "next/script";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

declare global {
    interface Window {
        kakao: any;
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname().slice(1);
    console.log(pathname);

    useEffect(() => {
        AOS.init({});
    }, []);

    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    {children}
                    {pathname !== "login" ? <Navbar /> : null}
                </AuthProvider>
            </body>
        </html>
    );
}

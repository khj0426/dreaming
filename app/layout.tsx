"use client";
import "../styles/globals.css";
import { Inter } from "next/font/google";

import AOS from "aos";
import "aos/dist/aos.css";

import AuthProvider from "./components/Next-Auth";
const inter = Inter({ subsets: ["latin"] });

import Head from "next/head";
import Navbar from "./components/Navbar/Navbar";
import Script from "next/script";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "../styles/mediaLayout.module.css";
import Mobile from "./components/Mobile/Mobile";
import { metadata } from "./metadata";

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
    const pathname = usePathname();
    console.log(pathname);

    // 반응형 화면
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        AOS.init({});
    }, []);

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <html lang="en">
                <body className={inter.className}>
                    <AuthProvider>
                        {isMobile ? (
                            <>
                                {children}
                                {pathname !== "/login" && pathname !== "/" ? (
                                    <Navbar />
                                ) : null}
                            </>
                        ) : (
                            <Mobile />
                        )}
                    </AuthProvider>
                </body>
            </html>
        </>
    );
}

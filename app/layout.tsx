import './globals.css';
import { Inter } from 'next/font/google';

import AuthProvider from './components/Next-Auth';
const inter = Inter({ subsets: ['latin'] });

import KakaoLoginButton from './components/kakaoLoginButton';
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

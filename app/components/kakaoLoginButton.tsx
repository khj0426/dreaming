'use client';

import React, { useEffect } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

//NOTE - 마크업 추가적으로 필요함.

const KakaoLoginButton = () => {
  const router = useRouter();
  const handleKakaoLogin = async () => {
    await signIn('kakao', {
      redirect: true,
      callbackUrl: '/',
    });
  };

  const handleKakaoLogout = async () => {
    await signOut().then(() => {
      router.push(
        `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&logout_redirect_uri=http://localhost:3000`
      );
    });
  };
  return (
    <>
      <button className="border-2 p-2" onClick={handleKakaoLogin}>
        카카오 로그인
      </button>

      <button className="border-2 p-2" onClick={handleKakaoLogout}>
        카카오 로그아웃
      </button>
    </>
  );
};

export default KakaoLoginButton;

'use client';

import React, { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const KakaoLoginButton = () => {
  const onClick = async () => {
    await signIn('kakao', {
      redirect: true,
      callbackUrl: '/',
    });
  };
  const session = useSession();

  return (
    <>
      <button
        className="border-2 p-2"
        onClick={async () => await signIn('kakao')}
      >
        카카오 로그인
      </button>

      <button className="border-2 p-2" onClick={() => signOut()}>
        카카오 로그아웃
      </button>
    </>
  );
};

export default KakaoLoginButton;

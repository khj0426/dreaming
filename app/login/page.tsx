'use client';

import Image from 'next/image';
import React from 'react';
import styles from './login.module.css';
import { signIn } from 'next-auth/react';
function login() {
  const handleKakaoLogin = async () => {
    await signIn('kakao', {
      redirect: true,
      callbackUrl: '/main',
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.logoAnimation}>
        <div className={styles.logo}>
          <p className={styles.intro}>오늘은 어떤 꿈을 꾸셨나요?</p>
          {/* <Image
                            src="/logo_dreaming.png"
                            alt="LogoImg"
                            width={260}
                            height={70}
                            className={styles.logoImg}
                        ></Image> */}
          <img
            src="/logo_dreaming.png"
            alt="LogoImg"
            className={styles.logoImg}
          />
        </div>
        <div className={styles.circle1}></div>
      </div>
      <div className={styles.login}>
        <img
          src="/kakao_login.png"
          alt="kakaoLogin"
          className={styles.loginImg}
          onClick={handleKakaoLogin}
          style={{
            cursor: 'pointer',
          }}
        />
        {/* <Image
                    src="/kakao_login.png"
                    alt="kakaoLogin"
                    width={100}
                    height={100}
                    className={styles.loginImg}
                ></Image> */}
      </div>
    </div>
  );
}

export default login;

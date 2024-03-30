//app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth/next';
import KakaoProvider from 'next-auth/providers/kakao';
import { createNewUser } from '../../../lib/user';
import type { DefaultUser } from 'next-auth';

interface KakaoUser extends DefaultUser {
  connected_at: string;
  kakao_account: {
    profile: {
      profile_image_url: string;
      nickname: string;
    };
    email: string;
  };
}

//카카오의 refresh토큰으로 새 accessToken을 받아온다.
const refreshAccessToken = async (token: any) => {
  try {
    const response = await fetch('https://kauth.kakao.com/oauth/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`,
        refresh_token: token.refreshToken,
        client_secret: `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET}`,
      }),
    });

    const refreshedAccessToken = await response.json();
    if (response.ok) {
      return {
        ...token,
        accessToken: refreshedAccessToken.access_token,
        refreshToken: refreshedAccessToken.refresh_token ?? token.refreshToken,
        accessTokenExpires: Date.now() + refreshedAccessToken.expires_in * 1000,
      };
    }
  } catch (e) {
    console.error('accessToken을 다시 발급받는 도중 에러', e);
  }
};

const handler = NextAuth({
  pages: {
    signIn: '/auth/signIn',
  },
  session: {
    strategy: 'jwt',
    //하루 동안 세션 유지
    maxAge: 24 * 60 * 60,
  },
  logger: {},
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET || '',
      profile(profile, tokens) {
        return profile;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      try {
        const { kakao_account } = profile as KakaoUser;
        await createNewUser({
          id: user.id + '',
          image: kakao_account.profile.profile_image_url,
          email: kakao_account.email,
          name: kakao_account.profile.nickname,
        });
      } catch (e) {
        console.error(e);
      }

      if (account && account.expires_at) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at * 1000;

        const nowTime = Date.now();
        const TEN_MINUTE_AGE = 60 * 10 * 1000;

        //10분 전에 토큰을 갱신해준다.
        const shouldRefreshTime =
          account.expires_at * 1000 - nowTime - TEN_MINUTE_AGE;

        if (shouldRefreshTime > 0) {
          return token;
        }
      }
      const newToken = await refreshAccessToken(token);
      return newToken;
    },
    async session({ session, token }) {
      const sessionUser = {
        ...token,
      };

      try {
        delete sessionUser?.refreshToken;
      } catch (e) {
        console.error(e);
      }
      session.user = sessionUser;
      return session;
    },
  },
});

export { handler as GET, handler as POST };

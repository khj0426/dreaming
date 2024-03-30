//app/api/auth/[...nextauth]/route.ts

import { refreshKakaoAccessToken } from '../../../lib/oauth';
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
      const newToken = await refreshKakaoAccessToken(token);
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

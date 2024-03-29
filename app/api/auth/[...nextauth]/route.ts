//app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth/next';
import KakaoProvider from 'next-auth/providers/kakao';
import { createNewUser } from '../../../lib/user';
import { Session } from 'next-auth';
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
    maxAge: -1,
    updateAge: 24 * 60 * 60,
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
      const { kakao_account } = profile as KakaoUser;
      await createNewUser({
        id: user.id + '',
        image: kakao_account.profile.profile_image_url,
        email: kakao_account.email,
        name: kakao_account.profile.nickname,
      });
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        ...token,
      };
    },
  },
});

export { handler as GET, handler as POST };

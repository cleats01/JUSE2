import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { getUserByEmail } from '../../../prisma/user';

import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/user',
  },
  callbacks: {
    async signIn({ user }) {
      const result = await getUserByEmail(user.email as string);
      return result
        ? true
        : `${process.env.BASE_URL}/user/signup/${user.email}`;
    },
    async jwt({ token, account, profile, user }) {
      if (account) {
        const userData = await getUserByEmail(user?.email as string).then(
          (data) => data
        );
        token.id = userData?.id;
        token.nickname = userData?.nickname;
        token.userTechStack = userData?.userTechStack;
        token.like = userData?.like;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.nickname = token.nickname;
      session.user.userTechStack = token.userTechStack;
      session.user.like = token.like;
      return session;
    },
  },
  // adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);

import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { getUserByEmail } from '../../../prisma/user';

export default NextAuth({
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
      return result ? true : `/user/signup/${user.email}`;
    },
  },
  // adapter: MongoDBAdapter(clientPromise),
});

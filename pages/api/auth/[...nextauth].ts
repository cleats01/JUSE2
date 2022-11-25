import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';

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
    signIn: '/login',
    newUser: '/user/signup/',
  },
  callbacks: {
    async signIn({ user }) {
      const result = await (await clientPromise)
        .db()
        .collection('profiles')
        .findOne({ email: user.email });
      return result ? true : `/user/signup/${user.email}`;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
});

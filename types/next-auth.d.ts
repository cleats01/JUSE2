import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      nickname?: string;
    } & DefaultSession['user'];
  }
  interface Profile {
    nickname: 'string';
  }
}

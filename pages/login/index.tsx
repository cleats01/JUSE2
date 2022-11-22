import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import TabBar from '../../components/TabBar';

export default function Chat() {
  return (
    <React.Fragment>
      <button onClick={() => signIn('google', { callbackUrl: '/user' })}>
        google 로그인
      </button>
      <button onClick={() => signIn('github', { callbackUrl: '/user' })}>
        github 로그인
      </button>
      <TabBar />
    </React.Fragment>
  );
}

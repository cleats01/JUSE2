import React from 'react';
import TabBar from '../../components/TabBar';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function User() {
  const signOutHandler = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <React.Fragment>
      <h1>User</h1>
      <button onClick={signOutHandler}>Sign Out</button>
      <TabBar />
    </React.Fragment>
  );
}

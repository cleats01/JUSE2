import React from 'react';
import TabBar from '../../components/TabBar';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function User() {
  const router = useRouter();

  const signOutHandler = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <React.Fragment>
      <h1>User</h1>
      <button onClick={signOutHandler}>Sign Out</button>
      <TabBar />
    </React.Fragment>
  );
}

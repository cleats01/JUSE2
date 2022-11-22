import React from 'react';
import { useSession } from 'next-auth/react';
import TabBar from '../components/TabBar';

export default function Home() {
  const { data, status } = useSession();
  return (
    <React.Fragment>
      <TabBar />
    </React.Fragment>
  );
}

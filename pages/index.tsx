import React from 'react';
import { useSession } from 'next-auth/react';
import TabBar from '../components/TabBar';
import styled from 'styled-components';

export default function Home() {
  const { data, status } = useSession();
  return (
    <HomeLayout>
      hi
      <TabBar />
    </HomeLayout>
  );
}

const HomeLayout = styled.div``;

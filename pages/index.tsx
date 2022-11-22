import React from 'react';
import { useSession } from 'next-auth/react';
import TabBar from '../components/TabBar';
import styled from 'styled-components';
import NavbarMain from '../components/NavbarMain';

export default function Home() {
  const { data, status } = useSession();
  return (
    <HomeLayout>
      <NavbarMain />
      <span>hi</span>
      <TabBar />
    </HomeLayout>
  );
}

const HomeLayout = styled.div``;

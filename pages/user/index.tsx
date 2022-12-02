import React, { useEffect, useState } from 'react';
import TabBar from '../../components/TabBar';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import NavbarTextOnly from '../../components/NavbarTextOnly';
import styled from 'styled-components';
import axios from 'axios';
import { StackBubble } from '../add';

interface userInfoData {
  id: string;
  email: string;
  nickname: string;
  name: string;
  userTechStack: string[];
}

export default function User() {
  const { data: session, status } = useSession();
  const signOutHandler = () => {
    signOut({ callbackUrl: '/login' });
  };
  const [user, setUser] = useState<userInfoData>();

  useEffect(() => {
    const userInfoData = async () =>
      await axios
        .get(`/api/user?id=${session?.user.id}`)
        .then((res) => setUser(res.data));
    if (status === 'authenticated') {
      userInfoData();
    }
  }, [status]);

  return user ? (
    <UserInfoLayout>
      <NavbarTextOnly centerText='내 정보' />
      <h1>{user.nickname}</h1>
      {user.userTechStack.map((stack) => (
        <StackBubble key={stack} src={`/icons/stacks/${stack}.png`} />
      ))}
      <button onClick={signOutHandler}>Sign Out</button>
      <TabBar />
    </UserInfoLayout>
  ) : (
    <div>loading...</div>
  );
}

const UserInfoLayout = styled.div`
  padding: 70px 16px;
`;

import styled from 'styled-components';
import { useSession, signIn, signOut } from 'next-auth/react';
import router from 'next/router';

import HomeIcon from '../public/icons/home.svg';
import SearchIcon from '../public/icons/search.svg';
import AddIcon from '../public/icons/add.svg';
import ChatIcon from '../public/icons/chat.svg';
import UserIcon from '../public/icons/user.svg';
import Link from 'next/link';

interface tab {
  id: number;
  icon: JSX.Element;
  label: string;
  path: string;
}

export default function TabBar() {
  const { data, status } = useSession();

  const tabList: tab[] = [
    { id: 1, icon: <HomeIcon />, label: '홈', path: '/' },
    { id: 2, icon: <SearchIcon />, label: '검색', path: '/search' },
    ,
    { id: 3, icon: <AddIcon />, label: '등록', path: '/add' },
    ,
    { id: 4, icon: <ChatIcon />, label: '주시톡', path: '/' },
    ,
    { id: 5, icon: <UserIcon />, label: '내 정보', path: '/user' },
  ];

  return (
    <TabBarLayout>
      <UlRow>
        {tabList.map(
          (tab: tab): JSX.Element => (
            <Link key={tab.id} href={tab.path}>
              hi
            </Link>
          )
        )}
      </UlRow>
    </TabBarLayout>
  );
}

const TabBarLayout = styled.nav`
  height: 50px;
  width: 100vw;
  padding: 5px 25px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid red;
`;

const UlRow = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const TabIcon = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 40px;
  > label {
    font-size: 12px;
  }
`;

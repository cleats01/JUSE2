import styled from 'styled-components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import {
  AddIcon,
  HomeIcon,
  SearchIcon,
  ChatIcon,
  UserIcon,
} from 'components/Common/Icons';

interface ITab {
  id: number;
  icon: JSX.Element;
  label: string;
  path: string;
  selected: boolean;
}

export default function TabBar() {
  const { data, status } = useSession();
  const router = useRouter();

  const tabList: ITab[] = [
    {
      id: 1,
      icon: <HomeIcon />,
      label: '홈',
      path: '/',
      selected: router.pathname === '/',
    },
    {
      id: 2,
      icon: <SearchIcon />,
      label: '검색',
      path: '/search',
      selected: router.pathname === '/search',
    },
    {
      id: 3,
      icon: <AddIcon />,
      label: '등록',
      path: '/new',
      selected: router.pathname === '/new',
    },
    {
      id: 4,
      icon: <ChatIcon />,
      label: '주시톡',
      path: '/chat',
      selected: router.pathname === '/chat',
    },
    {
      id: 5,
      icon: <UserIcon />,
      label: '내 정보',
      path: '/user',
      selected: router.pathname === '/user' || router.pathname === '/login',
    },
  ];

  return (
    <TabBarLayout>
      <UlRow>
        {tabList.map(
          (tab: ITab): JSX.Element => (
            <TabIcon key={tab.id}>
              <Link href={tab.path} className={tab.selected.toString()}>
                {tab.icon}
                <label>{tab.label}</label>
              </Link>
            </TabIcon>
          )
        )}
      </UlRow>
    </TabBarLayout>
  );
}

const TabBarLayout = styled.div`
  padding: 8px 20px;
  padding-bottom: 16px;
  position: sticky;
  width: 100%;
  max-width: 480px;
  margin-top: auto;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.grey1};
  background-color: #fff;
  z-index: 2;
`;

const UlRow = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const TabIcon = styled.li`
  > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 40px;
    font-size: 12px;
    &.false {
      fill: ${({ theme }) => theme.colors.grey3};
      color: ${({ theme }) => theme.colors.grey3};
    }
  }
`;

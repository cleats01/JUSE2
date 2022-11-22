import styled from 'styled-components';
import { useSession, signIn, signOut } from 'next-auth/react';
import HomeIcon from '../public/icons/home.svg';
import SearchIcon from '../public/icons/search.svg';
import AddIcon from '../public/icons/add.svg';
import ChatIcon from '../public/icons/chat.svg';
import UserIcon from '../public/icons/user.svg';

export default function TabBar() {
  const { data, status } = useSession();
  return (
    <TabBarLayout>
      <UlRow>
        <TabIcon>
          <HomeIcon />
          <span>홈</span>
        </TabIcon>
        <TabIcon>
          <SearchIcon />
          <span>검색</span>
        </TabIcon>
        <TabIcon>
          <AddIcon />
          <span>등록</span>
        </TabIcon>
        <TabIcon>
          <ChatIcon />
          <span>주시톡</span>
        </TabIcon>
        <TabIcon>
          <UserIcon />
          <span>내 정보</span>
        </TabIcon>
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
  > span {
    font-size: 12px;
  }
`;

import styled from 'styled-components';

import TabBar from 'components/TabBar';
import NavbarTextOnly from 'components/NavbarTextOnly';
import ChatList from 'components/Chat/ChatList';

export default function ChatListPage() {
  return (
    <ChatListLayout>
      <NavbarTextOnly centerText='주시톡' />
      <ChatList />
      <TabBar />
    </ChatListLayout>
  );
}

const ChatListLayout = styled.div`
  padding: 65px 0;
`;

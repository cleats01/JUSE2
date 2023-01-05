import styled from 'styled-components';

import NavbarTextOnly from 'components/Common/NavbarTextOnly';
import ChatList from 'components/Chat/ChatList';

export default function BoardChatPage() {
  return (
    <ChatListLayout>
      <NavbarTextOnly centerText='채팅목록' back />
      <ChatList />
    </ChatListLayout>
  );
}

const ChatListLayout = styled.div`
  padding: 65px 0;
`;

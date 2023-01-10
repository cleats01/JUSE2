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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

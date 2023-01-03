import React, { useState, useRef, useEffect, useCallback } from 'react';

import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import TabBar from '../../components/TabBar';
import NavbarTextOnly from '../../components/NavbarTextOnly';
import { getChatList } from '../../utils/axios';
import { ChattingRoom } from '@prisma/client';
import ChatListItem from '../../components/ChatListItem';

export default function ChatListPage() {
  const { data: session, status } = useSession();
  const [chatList, setChatList] = useState<ChattingRoom[]>([]);

  useEffect(() => {
    getChatList(session?.user.id).then((res) => {
      setChatList(res);
    });
  }, []);

  return (
    <ChatListLayout>
      <NavbarTextOnly centerText='주시톡' />
      <ChatListContainer>
        {chatList?.map((chattingRoom) => (
          <ChatListItem key={chattingRoom.id} data={chattingRoom} />
        ))}
      </ChatListContainer>
      <TabBar />
    </ChatListLayout>
  );
}

const ChatListLayout = styled.div``;

const ChatListContainer = styled.div`
  padding: 65px 0;
`;

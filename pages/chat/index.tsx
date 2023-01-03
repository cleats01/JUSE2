import React, { useState, useRef, useEffect, useCallback } from 'react';

import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import TabBar from '../../components/TabBar';
import NavbarTextOnly from '../../components/NavbarTextOnly';
import { getChatList } from '../../utils/axios';
import { Room } from '@prisma/client';
import ChatListItem, { IRoom } from '../../components/ChatListItem';

export default function ChatListPage() {
  const { data: session, status } = useSession();
  const [chatList, setChatList] = useState<Room[]>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      getChatList(session?.user.id).then((res) => {
        setChatList(res);
      });
    }
  }, [status]);

  return (
    <ChatListLayout>
      <NavbarTextOnly centerText='주시톡' />
      <ChatListContainer>
        {chatList?.map((chattingRoom) => (
          <ChatListItem key={chattingRoom.id} data={chattingRoom as IRoom} />
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

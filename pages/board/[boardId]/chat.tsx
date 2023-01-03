import React, { useState, useRef, useEffect, useCallback } from 'react';

import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import TabBar from '../../../components/TabBar';
import NavbarTextOnly from '../../../components/NavbarTextOnly';
import { getChatListByBoardId } from '../../../utils/axios';
import { Room } from '@prisma/client';
import ChatListItem, { IRoom } from '../../../components/ChatListItem';
import { useRouter } from 'next/router';

export default function ChatListPage() {
  const { data: session, status } = useSession();
  const [chatList, setChatList] = useState<Room[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      getChatListByBoardId(router.query.boardId as string).then((res) => {
        setChatList(res);
      });
    }
  }, [status]);

  return (
    <ChatListLayout>
      <NavbarTextOnly centerText='채팅목록' back />
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

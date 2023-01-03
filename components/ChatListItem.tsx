import styled from 'styled-components';

import ChatIcon from '../public/icons/chat.svg';
import BookmarkIcon from '../public/icons/bookmark.svg';
import { StackBubble } from '../pages/add';
import Link from 'next/link';
import { boardData } from '../pages';
import theme from '../styles/theme';
import { ChattingRoom } from '@prisma/client';
import { useState } from 'react';
import { UserImgWrapper } from '../pages/user/signup/[...signup]';
import { useSession } from 'next-auth/react';

export default function ChatListItem({ data }: { data: ChattingRoom }) {
  const { data: session } = useSession();
  const { id: chatId, chat, membersId, membersData } = data;
  const otherUser = membersData.find((user) => user.id !== session?.user.id);

  return (
    <Link href={`/chat/${chatId}`}>
      <ChatListItemLayout>
        <UserImgWrapper size={'50px'}>
          <img src={otherUser?.image} />
        </UserImgWrapper>
        <ChattingRoomInfo>
          <Username>{otherUser?.nickname}</Username>
          <LastMessage>
            {chat.length ? chat.at(-1)?.message : '메세지가 없습니다.'}
          </LastMessage>
        </ChattingRoomInfo>
      </ChatListItemLayout>
    </Link>
  );
}

const ChatListItemLayout = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px 20px;
  width: 100%;
`;

const ChattingRoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const Username = styled.div`
  font-weight: 600;
`;

const LastMessage = styled.div`
  color: ${({ theme }) => theme.colors.grey4};
  font-size: 14px;
`;

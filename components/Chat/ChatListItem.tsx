import styled from 'styled-components';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { UserImgWrapper } from 'pages/user/signup/[...signup]';

export default function ChatListItem({ data }: { data: IRoom }) {
  const { data: session } = useSession();
  const { id: chatId, chat, membersData } = data;
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

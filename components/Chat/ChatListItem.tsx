import styled from 'styled-components';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import 'moment/locale/ko';

import UserImgWrapper from 'components/Common/UserImgWrapper';

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
        <TimeInfo>
          {chat.length ? moment(chat.at(-1)?.createdAt).fromNow() : ''}
        </TimeInfo>
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
  max-width: min(240px, 50vw);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 1;
`;

const TimeInfo = styled.div`
  padding: 10px;
  margin-left: auto;
  color: ${({ theme }) => theme.colors.grey4};
  font-size: 14px;
`;

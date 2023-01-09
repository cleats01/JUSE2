import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getChatList, getChatListByBoardId } from 'utils/axios';
import { useRouter } from 'next/router';

import ChatListItem from 'components/Chat/ChatListItem';
import LoadingSpinner from 'components/Common/LoadingSpinner';

export default function ChatList() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [chatList, setChatList] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isBoardChatPage = router.pathname.includes('board');

  useEffect(() => {
    if (status === 'authenticated') {
      if (isBoardChatPage) {
        getChatListByBoardId(router.query.boardId as string).then((res) => {
          setChatList(res);
          setLoading(false);
        });
      } else {
        getChatList(session?.user.id).then((res: IRoom[]) => {
          setChatList(res);
          setLoading(false);
        });
      }
    }
  }, [status]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <ChatListContainer>
      {chatList.length ? (
        chatList.map((chattingRoom) => (
          <ChatListItem key={chattingRoom.id} data={chattingRoom} />
        ))
      ) : (
        <NullMessage>대화중인 채팅방이 없습니다.</NullMessage>
      )}
    </ChatListContainer>
  );
}

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const NullMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding-top: 25vh;
  color: ${({ theme }) => theme.colors.grey4};
`;

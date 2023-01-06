import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getChatList, getChatListByBoardId } from 'utils/axios';
import { useRouter } from 'next/router';

import ChatListItem from 'components/Chat/ChatListItem';

export default function ChatList() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [chatList, setChatList] = useState<IRoom[]>([]);
  const isBoardChatPage = router.pathname.includes('board');

  useEffect(() => {
    if (status === 'authenticated') {
      if (isBoardChatPage) {
        getChatListByBoardId(router.query.boardId as string).then((res) => {
          setChatList(res);
        });
      } else {
        getChatList(session?.user.id).then((res: IRoom[]) => {
          setChatList(res);
        });
      }
    }
  }, [status]);

  return (
    <ChatListContainer>
      {chatList?.map((chattingRoom) => (
        <ChatListItem key={chattingRoom.id} data={chattingRoom} />
      ))}
    </ChatListContainer>
  );
}

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

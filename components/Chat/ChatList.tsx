import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getChatList } from 'utils/axios';

import ChatListItem from 'components/Chat/ChatListItem';

export default function ChatList() {
  const { data: session, status } = useSession();
  const [chatList, setChatList] = useState<IRoom[]>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      getChatList(session?.user.id).then((res: IRoom[]) => {
        setChatList(res);
      });
    }
  }, [status]);

  return (
    <>
      {chatList?.map((chattingRoom) => (
        <ChatListItem key={chattingRoom.id} data={chattingRoom} />
      ))}
    </>
  );
}

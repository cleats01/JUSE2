import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getChattingRoom, postMessage } from 'utils/axios';

import NavbarTextOnly from 'components/NavbarTextOnly';
import ChatArea from 'components/Chat/ChatArea';
import ChatInput from 'components/Chat/ChatInput';

export default function ChattingRoomPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messageInput, setMessageInput] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [other, setOther] = useState<IUserSimple>();

  // 이전 채팅 불러오기 및 유저 식별
  useEffect(() => {
    if (router.query.chatId) {
      getChattingRoom(router.query.chatId as string).then((data: IRoom) => {
        setMessages(data.chat);
        setOther(
          data.membersData.find(
            (user: IUserSimple) => user.id !== session?.user.id
          )
        );
      });
    }
  }, [router]);

  // 스크롤 자동으로 밑으로 내리기
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight });
  }, [messages]);

  const chatInputProps = {
    messageInput,
    setMessageInput,
    setMessages,
  };

  return (
    <ChattingLayout>
      <NavbarTextOnly centerText={other?.nickname as string} back />
      <ChatArea messages={messages} />
      <ChatInput {...chatInputProps} />
    </ChattingLayout>
  );
}

const ChattingLayout = styled.div`
  max-width: 480px;
  padding: 55px 0 50px 0;
`;

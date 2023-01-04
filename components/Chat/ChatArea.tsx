import styled from 'styled-components';
import { useSession } from 'next-auth/react';

interface IProps {
  messages: IMessage[];
}

export default function ChatArea(props: IProps) {
  const { data: session, status } = useSession();
  const { messages } = props;
  return (
    <ChatAreaContainer>
      {messages.map((message, index) => (
        <ChatBubble
          key={index}
          isMe={session?.user.nickname === message.username}>
          {message.message}
        </ChatBubble>
      ))}
    </ChatAreaContainer>
  );
}

const ChatAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: 100%;
  padding: 10px;
`;

const ChatBubble = styled.div<{ isMe: boolean }>`
  border-radius: 15px;
  background-color: ${({ theme, isMe }) =>
    isMe ? theme.colors.grey1 : '#fff'};
  border: ${({ theme, isMe }) =>
    isMe ? '' : `1px solid ${theme.colors.grey2}`};
  padding: 10px 20px;
  max-width: 50%;
  overflow-wrap: break-word;
  margin-left: ${({ isMe }) => (isMe ? 'auto' : '')};
  margin-right: ${({ isMe }) => (isMe ? '' : 'auto')};
`;

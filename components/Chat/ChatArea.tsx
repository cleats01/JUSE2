import styled from 'styled-components';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import 'moment/locale/ko';

interface IProps {
  messages: IMessage[];
}

export default function ChatArea(props: IProps) {
  const { data: session, status } = useSession();
  const { messages } = props;
  return (
    <ChatAreaContainer>
      {messages.map((message, index) =>
        message.userId === 'date' ? (
          <DateLineWrapper key={index}>
            {moment(message.createdAt).format('LL')}
          </DateLineWrapper>
        ) : session?.user.id === message.userId ? (
          <MyMessageWrapper key={index}>
            <Time>{moment(message.createdAt).format('HH:mm')}</Time>
            <ChatBubble key={index} isMe={session?.user.id === message.userId}>
              {message.message}
            </ChatBubble>
          </MyMessageWrapper>
        ) : (
          <OtherMessageWrapper key={index}>
            <ChatBubble key={index} isMe={session?.user.id === message.userId}>
              {message.message}
            </ChatBubble>
            <Time>{moment(message.createdAt).format('HH:mm')}</Time>
          </OtherMessageWrapper>
        )
      )}
    </ChatAreaContainer>
  );
}

const ChatAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: calc(100vh - 105px);
  height: 100%;
  width: 100%;
  padding: 10px;
`;

const DateLineWrapper = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.grey4};
  font-size: 14px;
  padding: 5px 0;
`;

const OtherMessageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  margin-right: auto;
`;

const MyMessageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  margin-left: auto;
`;

const Time = styled.div`
  color: ${({ theme }) => theme.colors.grey4};
  font-size: 14px;
`;

const ChatBubble = styled.div<{ isMe: boolean }>`
  border-radius: 15px;
  background-color: ${({ theme, isMe }) =>
    isMe ? theme.colors.grey1 : '#fff'};
  border: ${({ theme, isMe }) =>
    isMe ? '' : `1px solid ${theme.colors.grey2}`};
  padding: 10px 15px;
  width: 70vw;
  max-width: 336px;
  overflow-wrap: break-word;
`;

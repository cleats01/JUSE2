import React, { useState, useRef, useEffect, useCallback } from 'react';

// * MUI
import { Stack, TextField, Alert, Button, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSession } from 'next-auth/react';
import NavbarTextOnly from '../../components/NavbarTextOnly';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useChannel } from '../../utils/hooks';
import axios from 'axios';
import { Types } from 'ably/ably';
import { userSimple } from '@prisma/client';

interface IMessage {
  message: string;
  username: string;
}

export default function ChattingRoom() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messageInput, setMessageInput] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [other, setOther] = useState<userSimple>();

  useEffect(() => {
    if (router.query.chatId) {
      axios.get(`/api/chat/${router.query.chatId}`).then((res) => {
        setMessages(res.data.chat);
        setOther(
          res.data.membersData.find(
            (user: userSimple) => user.id !== session?.user.id
          )
        );
      });
    }
  }, [router]);

  const [channel, ably] = useChannel(
    router.query.chatId as string,
    (message: any) => {
      setMessages((prev) => [
        ...prev,
        { username: message.name, message: message.data },
      ]);
    }
  );

  const messageInputHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessageInput(event.target.value);
    },
    [messageInput]
  );

  const enterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      // send message
      event.preventDefault();
      submitSendMessage(event as React.FormEvent<HTMLButtonElement>);
    }
  };

  const submitSendMessage = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (messageInput) {
      await (channel as Types.RealtimeChannelPromise).publish({
        name: session?.user.nickname,
        data: messageInput,
      });
      await axios.post(`/api/chat/${router.query.chatId}`, {
        data: [
          ...messages,
          { username: session?.user.nickname, message: messageInput },
        ],
      });
      setMessageInput('');
    }
  };

  // 스크롤 밑으로 내리기
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight });
  }, [messages]);

  return (
    <ChattingLayout>
      <NavbarTextOnly centerText={other?.nickname as string} back />
      <ChatArea>
        {messages.map((message, index) => (
          <ChatBubble
            className='chat-message'
            key={index}
            isMe={session?.user.nickname === message.username}>
            {message.message}
          </ChatBubble>
        ))}
      </ChatArea>
      <ChatInputWrapper>
        <TextField
          sx={{ margin: 0, flexGrow: 1 }}
          variant='outlined'
          value={messageInput}
          onChange={messageInputHandler}
          margin='normal'
          autoFocus
          multiline
          size='small'
          onKeyPress={enterKeyPress}
        />
        <Button
          sx={{ color: '#fff', padding: '9px 0' }}
          size='small'
          type='submit'
          variant='contained'
          onClick={submitSendMessage}
          disableElevation>
          <SendIcon fontSize='small' />
        </Button>
      </ChatInputWrapper>
    </ChattingLayout>
  );
}

const ChattingLayout = styled.div`
  max-width: 480px;
  padding: 55px 0 50px 0;
`;

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: 100%;
  padding: 10px;
`;

const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
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

import styled from 'styled-components';
import {
  SetStateAction,
  Dispatch,
  useCallback,
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { postMessage } from 'utils/axios';
import { useChannel } from 'utils/hooks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Types } from 'ably/ably';
import moment from 'moment';
import 'moment/locale/ko';

import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface IProps {
  messageInput: string;
  setMessageInput: Dispatch<SetStateAction<string>>;
  messages: IMessage[];
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
}

export default function ChatInput(props: IProps) {
  const { messageInput, setMessageInput, messages, setMessages } = props;
  const { data: session, status } = useSession();
  const router = useRouter();

  const [channel, ably] = useChannel(
    router.query.chatId as string,
    (message: any) => {
      setMessages((prev) => [
        ...prev,
        {
          userId: message.name,
          message: message.data,
        },
      ]);
    }
  );

  const messageInputHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setMessageInput(event.target.value);
    },
    [messageInput]
  );

  const submitSendMessage = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (messageInput) {
      const message = messageInput;
      setMessageInput('');
      // 날짜 변경 시
      if (
        !messages.length ||
        moment(messages.at(-1)?.createdAt).format('L') !==
          moment(Date.now()).format('L')
      ) {
        await (channel as Types.RealtimeChannelPromise).publish({
          name: 'date',
          data: 'line',
        });
        postMessage(router.query.chatId as string, {
          userId: 'date',
          message: 'line',
        });
      }
      await (channel as Types.RealtimeChannelPromise).publish({
        name: session?.user.id,
        data: message,
      });
      postMessage(router.query.chatId as string, {
        userId: session?.user.id,
        message,
      });
    }
  };

  const enterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitSendMessage(event as FormEvent<HTMLButtonElement>);
    }
  };

  return (
    <ChatInputContainer>
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
    </ChatInputContainer>
  );
}

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  max-width: 480px;
`;

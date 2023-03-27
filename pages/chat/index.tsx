import Authorization from '@components/Common/Authorization';
import ChatListPage from 'components/Chat/ChatPage';

export default function Chat() {
  return (
    <Authorization>
      <ChatListPage />
    </Authorization>
  );
}

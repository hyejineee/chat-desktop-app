import withAuth from '@utils/withAuth';
import ChatListContainer from 'src/components/unit/chat/list/ChatList.container';

function ChatListPage() {
  return <ChatListContainer />;
}

export default withAuth(ChatListPage);

import withAuth from '@utils/withAuth';
import CreateOpenChatContainer from 'src/components/unit/chat/create/CreateOpenChat.container';

function CreateOpenChatPage() {
  return <CreateOpenChatContainer />;
}

export default withAuth(CreateOpenChatPage);

import { CREATE_OPEN_CHAT_PAGE } from '@constants/paths';
import { useRouter } from 'next/router';

export default function ChatListContainer() {
  const router = useRouter();

  const handleClickCreateOpenChat = () => {
    router.push(CREATE_OPEN_CHAT_PAGE);
  };

  return (
    <div>
      채팅 방 목록 페이지
      <button type='button' onClick={handleClickCreateOpenChat}>
        오픈 채팅방 생성
      </button>
    </div>
  );
}

import { CREATE_OPEN_CHAT_PAGE } from '@constants/paths';
import {
  useFetchAllChatRoomsByUser,
  useUserRooms,
} from '@contexts/RoomContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ChatListContainer() {
  const router = useRouter();
  const userRooms = useUserRooms();
  const fetchAllRooms = useFetchAllChatRoomsByUser();

  const handleClickCreateOpenChat = () => {
    router.push(CREATE_OPEN_CHAT_PAGE);
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <div>
      채팅 방 목록 페이지
      <button type='button' onClick={handleClickCreateOpenChat}>
        오픈 채팅방 생성
      </button>
    </div>
  );
}

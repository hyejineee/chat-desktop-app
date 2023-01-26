import {
  useFetchAllChatRoomsByUser,
  useUserRooms,
} from '@contexts/RoomContext';
import withAuth from '@utils/withAuth';
import { useEffect } from 'react';
import ChatListContainer from 'src/components/unit/chat/list/ChatList.container';

function ChatListPage() {
  const userRooms = useUserRooms();
  const fetchAllRooms = useFetchAllChatRoomsByUser();

  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <ChatListContainer
      roomList={userRooms}
      title='나의 채팅 리스트'
      subTitle='어떤 새로운 메시지가 왔을까요? 확인해 보세요!'
    />
  );
}

export default withAuth(ChatListPage);

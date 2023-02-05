import {
  useFetchAllChatRoomsByUser,
  useUserRooms,
} from '@contexts/RoomContext';
import { RoomType } from '@type/room.types';
import withAuth from '@utils/withAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ChatListContainer from 'src/components/unit/chat/chatRoomList/ChatList.container';

function ChatListPage() {
  const router = useRouter();
  const userRooms = useUserRooms();
  const fetchAllRooms = useFetchAllChatRoomsByUser();

  const handleClickRoomItem = (room: RoomType) => () => {
    router.push(
      `/chat/${room.uid}?type=${room.type}&title=${
        room.title || room.users?.[0].nickName
      }`,
    );
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <ChatListContainer
      roomList={userRooms}
      title='나의 채팅 리스트'
      subTitle='어떤 새로운 메시지가 왔을까요? 확인해 보세요!'
      onClickChatRoomItem={handleClickRoomItem}
    />
  );
}

export default withAuth(ChatListPage);

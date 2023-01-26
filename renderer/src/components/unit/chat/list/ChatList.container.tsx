import { CREATE_OPEN_CHAT_PAGE } from '@constants/paths';
import {
  useFetchAllChatRoomsByUser,
  useUserRooms,
} from '@contexts/RoomContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ChatListUI from './ChatList.presenter';

export default function ChatListContainer() {
  const router = useRouter();
  const userRooms = useUserRooms();
  const fetchAllRooms = useFetchAllChatRoomsByUser();

  const handleClickCreateOpenChat = () => {
    router.push(CREATE_OPEN_CHAT_PAGE);
  };

  const handleClickRoomItem = (roomId: string, type: string) => () => {};

  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <ChatListUI
      roomList={userRooms}
      onClickRoomItem={handleClickRoomItem}
      onClickCreateOpenChat={handleClickCreateOpenChat}
    />
  );
}

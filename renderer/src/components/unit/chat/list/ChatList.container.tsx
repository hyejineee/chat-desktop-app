import { CREATE_OPEN_CHAT_PAGE } from '@constants/paths';
import {
  useFetchAllChatRoomsByUser,
  useUserRooms,
} from '@contexts/RoomContext';
import { RoomType } from '@type/room';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ChatListUI from './ChatList.presenter';

type ChatListContainerPropsType = {
  roomList: RoomType[] | null;
  title: string;
  subTitle: string;
};

export default function ChatListContainer({
  roomList,
  title,
  subTitle,
}: ChatListContainerPropsType) {
  const router = useRouter();

  const handleClickCreateOpenChat = () => {
    router.push(CREATE_OPEN_CHAT_PAGE);
  };

  const handleClickRoomItem = (roomId: string, type: string) => () => {
    router.push(`/chat/${roomId}?type=${type}`);
  };

  return (
    <ChatListUI
      roomList={roomList}
      title={title}
      subTitle={subTitle}
      onClickRoomItem={handleClickRoomItem}
      onClickCreateOpenChat={handleClickCreateOpenChat}
    />
  );
}

import { CREATE_OPEN_CHAT_PAGE } from '@constants/paths';
import { RoomType } from '@type/room.types';
import { useRouter } from 'next/router';
import ChatListUI from './ChatList.presenter';

type ChatListContainerPropsType = {
  roomList: RoomType[] | null;
  title: string;
  subTitle: string;
  onClickChatRoomItem: (room: RoomType) => () => void;
};

export default function ChatListContainer({
  roomList,
  title,
  subTitle,
  onClickChatRoomItem,
}: ChatListContainerPropsType) {
  const router = useRouter();

  const handleClickCreateOpenChat = () => {
    router.push(CREATE_OPEN_CHAT_PAGE);
  };

  return (
    <ChatListUI
      roomList={roomList}
      title={title}
      subTitle={subTitle}
      onClickRoomItem={onClickChatRoomItem}
      onClickCreateOpenChat={handleClickCreateOpenChat}
    />
  );
}

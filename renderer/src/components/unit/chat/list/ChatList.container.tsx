import { CREATE_OPEN_CHAT_PAGE } from '@constants/paths';
import { useEnterOpenChatRoom } from '@contexts/RoomContext';
import { RoomType } from '@type/room';
import { useRouter } from 'next/router';
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
  const enterOpenChatRoom = useEnterOpenChatRoom();

  const handleClickCreateOpenChat = () => {
    router.push(CREATE_OPEN_CHAT_PAGE);
  };

  const handleClickRoomItem = (room: RoomType) => () => {
    if (room.type.includes('open')) {
      enterOpenChatRoom(room.uid);
    }
    router.push(
      `/chat/${room.uid}?type=${room.type}&title=${
        room.title || room.users?.[0].nickName
      }`,
    );
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

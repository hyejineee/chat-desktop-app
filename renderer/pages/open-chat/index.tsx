import {
  useEnterOpenChatRoom,
  useFetchOpenChatRooms,
  useOpenRooms,
} from '@contexts/RoomContext';
import { RoomType } from '@type/room.types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ChatListContainer from 'src/components/unit/chat/chatRoomList/ChatList.container';

export default function OpenChatListPage() {
  const openRooms = useOpenRooms();
  const router = useRouter();
  const fetchOpenChatRoom = useFetchOpenChatRooms();
  const enterOpenChatRoom = useEnterOpenChatRoom();

  const handleClickChatRoomItem = (room: RoomType) => () => {
    enterOpenChatRoom(room.uid);
    router.push(
      `/chat/${room.uid}?type=${room.type}&title=${
        room.title || room.users?.[0].nickName
      }`,
    );
  };

  useEffect(() => {
    fetchOpenChatRoom();
  }, []);

  return (
    <ChatListContainer
      roomList={openRooms}
      title='오픈 채팅 리스트'
      subTitle='맘에드는 오픈 채팅방을 선택해  <br/> 대화에 참여해 보세요! <br/> + 버튼으로 새로운 오픈 채팅방을 만들 수 있어요!'
      onClickChatRoomItem={handleClickChatRoomItem}
    />
  );
}

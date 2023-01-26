import { useFetchOpenChatRooms, useOpenRooms } from '@contexts/RoomContext';
import { useEffect } from 'react';
import ChatListContainer from 'src/components/unit/chat/list/ChatList.container';

//
export default function OpenChatListPage() {
  const openRooms = useOpenRooms();
  const fetchOpenChatRoom = useFetchOpenChatRooms();

  useEffect(() => {
    fetchOpenChatRoom();
  }, []);

  return (
    <ChatListContainer
      roomList={openRooms}
      title='오픈 채팅 리스트'
      subTitle='맘에드는 오픈 채팅방을 선택해  <br/> 대화에 참여해 보세요! <br/> + 버튼으로 새로운 오픈 채팅방을 만들 수 있어요!'
    />
  );
}

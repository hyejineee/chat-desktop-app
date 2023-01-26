import { useCreatePersonalChatRoom } from '@contexts/RoomContext';
import { useFetchAllUser, useUserList } from '@contexts/UserContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserListUI from './UserList.presenter';

export default function UserListContainer() {
  const router = useRouter();
  const userList = useUserList();
  const fetchAllUser = useFetchAllUser();
  const createPersonalChatRoom = useCreatePersonalChatRoom();

  const handleClickPersonalChat = (uid: string) => async () => {
    try {
      const roomId = await createPersonalChatRoom(uid);

      router.push(`/chat/${roomId}?type=personal`);
    } catch (e) {
      // TODO : 에러 메세지 출력
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <UserListUI
      userList={userList}
      onClickPersonalChat={handleClickPersonalChat}
    />
  );
}

import { useCreatePersonalChatRoom } from '@contexts/RoomContext';
import { useFetchAllUser, useUserList } from '@contexts/UserContext';
import { useEffect } from 'react';
import UserItem from './item/UserItem';

export default function UserListContainer() {
  const userList = useUserList();
  const fetchAllUser = useFetchAllUser();
  const createPersonalChatRoom = useCreatePersonalChatRoom();

  const handleClickPersonalChat = (uid: string) => async () => {
    try {
      const roomId = await createPersonalChatRoom(uid);
      console.log(roomId);
    } catch (e) {
      // TODO : 에러 메세지 출력
      console.log('userList', e);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div>
      {(userList || []).map(user => (
        <UserItem user={user} onClickChat={handleClickPersonalChat(user.uid)} />
      ))}
    </div>
  );
}

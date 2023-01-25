import { SendOutlined } from '@ant-design/icons';
import { useCreatePersonalChatRoom } from '@contexts/RoomContext';
import { useFetchAllUser, useUserList } from '@contexts/UserContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserItem from 'src/components/common/items/UserItem';

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
    <div>
      {(userList || []).map(user => (
        <UserItem key={user.uid} user={user}>
          <button type='button' onClick={handleClickPersonalChat(user.uid)}>
            <SendOutlined />
          </button>
        </UserItem>
      ))}
    </div>
  );
}

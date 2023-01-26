import { useShowAlertMessage } from '@contexts/AlertMessageContext';
import { useCreatePersonalChatRoom } from '@contexts/RoomContext';
import { useFetchAllUser, useUserList } from '@contexts/UserContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserListUI from './UserList.presenter';

export default function UserListContainer() {
  const router = useRouter();
  const userList = useUserList();
  const showAlert = useShowAlertMessage();
  const fetchAllUser = useFetchAllUser();
  const createPersonalChatRoom = useCreatePersonalChatRoom();

  const handleClickPersonalChat =
    (uid: string, nickName: string) => async () => {
      try {
        const roomId = await createPersonalChatRoom(uid);

        router.push(`/chat/${roomId}?type=personal&title=${nickName}`);
      } catch (e) {
        if (e instanceof Error) {
          showAlert('error', e.message);
        }
      }
    };

  useEffect(() => {
    try {
      fetchAllUser();
    } catch (e) {
      if (e instanceof Error) {
        showAlert('error', e.message);
      }
    }
  }, []);

  return (
    <UserListUI
      userList={userList}
      onClickPersonalChat={handleClickPersonalChat}
    />
  );
}

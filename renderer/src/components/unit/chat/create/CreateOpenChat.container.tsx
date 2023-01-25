import { useCreateOpenChatRoom } from '@contexts/RoomContext';
import { useFetchAllUser, useUserList } from '@contexts/UserContext';
import { UserType } from '@type/auth';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CreateOpenChatUI from './CreateOpenChat.presenter';

export default function CreateOpenChatContainer() {
  const [selectedUser, setSelectedUser] = useState<UserType[]>();

  const { control, getValues } = useForm();

  const router = useRouter();
  const userList = useUserList();
  const createOpenChatRoom = useCreateOpenChatRoom();
  const fetchAllUser = useFetchAllUser();

  const handleClickCreate = async () => {
    const uids = selectedUser?.map(e => e.uid);
    const title = getValues('title');

    if (!uids || !title) return;

    try {
      const roomId = await createOpenChatRoom(uids, title);
      router.push(`/chat/${roomId}?type=open`);
    } catch (e) {
      // TODO: 에러 처리하기
    }
  };

  const handleClickUserItem = (user: UserType) => () => {
    if (_.includes(selectedUser, user)) {
      const newArray = _.remove(selectedUser || [], u => u.uid !== user.uid);
      setSelectedUser(newArray);
      return;
    }
    setSelectedUser(prev => [...(prev || []), user]);
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <CreateOpenChatUI
      control={control}
      userList={userList || []}
      selectedUserList={selectedUser || []}
      onClickCreate={handleClickCreate}
      onClickUserItem={handleClickUserItem}
    />
  );
}

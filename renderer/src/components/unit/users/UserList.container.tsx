import { useFetchAllUser, useUserList } from '@contexts/UserContext';
import { useEffect } from 'react';
import UserItem from './item/UserItem';

export default function UserListContainer() {
  const userList = useUserList();
  const fetchAllUser = useFetchAllUser();

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div>
      {(userList || []).map(user => (
        <UserItem user={user} onClickChat={() => {}} />
      ))}
    </div>
  );
}

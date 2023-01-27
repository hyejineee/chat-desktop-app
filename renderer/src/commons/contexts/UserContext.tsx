import { UserType } from '@type/auth.types';
import { IUserContext, IUserRepository } from '@type/user.types';
import constate from 'constate';
import { useState } from 'react';

type UseUserContextPropsType = {
  userRepository: IUserRepository;
};
const useUserContext: (props: UseUserContextPropsType) => IUserContext = ({
  userRepository,
}: UseUserContextPropsType) => {
  const [userList, setUserList] = useState<UserType[] | null>(null);

  const fetchAllUser = async () => {
    const users = await userRepository.fetchAllUser();
    setUserList(users);
  };

  return {
    userList,
    fetchAllUser,
  };
};

export const [UserProvider, useUserList, useFetchAllUser] = constate(
  useUserContext,
  value => value.userList,
  value => value.fetchAllUser,
);

import { UserType } from './auth';

export interface IUserRepository {
  fetchAllUser: () => Promise<UserType[] | null>;
}

export interface IUserContext {
  userList: UserType[] | null;
  fetchAllUser: () => Promise<void>;
}

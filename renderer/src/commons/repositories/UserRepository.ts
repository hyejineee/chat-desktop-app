import UserDataSource from '@dataSources/UserDataSource';
import * as authTypes from '@type/auth.types';
import APP_TYPES from '@type/container.types';
import { IUserRepository } from '@type/user.types';
import { inject, injectable } from 'inversify';

@injectable()
export default class UserRepository implements IUserRepository {
  private userDataSource: UserDataSource;

  private authRepository: authTypes.IAuthRepository;

  constructor(
    @inject(APP_TYPES.UserDataSource) dataSource: UserDataSource,
    @inject(APP_TYPES.IAuthRepository)
    authRepository: authTypes.IAuthRepository,
  ) {
    this.userDataSource = dataSource;
    this.authRepository = authRepository;
  }

  async fetchAllUser() {
    const currentUser = await this.authRepository.fetchLoggedInUser();

    if (!currentUser) return null;

    const fetched = await this.userDataSource.fetchAllUser(currentUser.uid);

    const users: authTypes.UserType[] = [];
    fetched.forEach(user => users.push(user.data() as authTypes.UserType));

    return users;
  }
}

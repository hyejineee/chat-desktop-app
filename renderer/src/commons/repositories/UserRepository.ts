import UserDataSource from '@dataSources/UserDataSource';
import { IAuthRepository, UserType } from '@type/auth';
import { IUserRepository } from '@type/user';

export default class UserRepository implements IUserRepository {
  private userDataSource: UserDataSource;

  private authRepository: IAuthRepository;

  constructor(dataSource: UserDataSource, authRepository: IAuthRepository) {
    this.userDataSource = dataSource;
    this.authRepository = authRepository;
  }

  async fetchAllUser() {
    const currentUser = await this.authRepository.fetchLoggedInUser();

    if (!currentUser) return null;

    const fetched = await this.userDataSource.fetchAllUser(currentUser.uid);

    const users: UserType[] = [];
    fetched.forEach(user => users.push(user.data() as UserType));

    return users;
  }
}

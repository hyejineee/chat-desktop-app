import AuthDataSource from '@dataSources/AuthDataSource';
import {
  IAuthRepository,
  LoginArgsType,
  RegisterUserArgsType,
  UserType,
} from '@type/auth';

export default class AuthRepository implements IAuthRepository {
  private authDataSource: AuthDataSource;

  private loggedInUser: UserType | null = null;

  constructor(dataSource: AuthDataSource) {
    this.authDataSource = dataSource;
  }

  async login(args: LoginArgsType) {
    return this.authDataSource.login(args);
  }

  async logout() {
    // TODO : 로그아웃 기능 구현
  }

  registerUser(args: RegisterUserArgsType) {
    return this.authDataSource.registerUser(args);
  }

  async checkLoggedIn() {
    if (this.loggedInUser) return true;

    const user = this.authDataSource.checkLoggedIn();

    if (user !== null && this.loggedInUser === null && user?.uid) {
      const fetchUser = await this.authDataSource.fetchUser(user.uid);
      this.loggedInUser = fetchUser;
      return true;
    }

    return false;
  }

  async fetchLoggedInUser() {
    // TODO : 로그인되어 있는 유저 정보 가져오기
    return {} as UserType;
  }
}

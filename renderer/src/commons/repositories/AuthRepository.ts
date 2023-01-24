import AuthDataSource from '@dataSources/AuthDataSource';
import {
  IAuthRepository,
  LoginArgsType,
  RegisterUserArgsType,
  UserType,
} from '@type/auth';

export default class AuthRepository implements IAuthRepository {
  private authDataSource: AuthDataSource;

  constructor(dataSource: AuthDataSource) {
    this.authDataSource = dataSource;
  }

  async login(args: LoginArgsType) {
    // TODO : 로그인 기능 구현
  }

  async logout() {
    // TODO : 로그아웃 기능 구현
  }

  registerUser(args: RegisterUserArgsType) {
    return this.authDataSource.registerUser(args);
  }

  async checkLoggedIn() {
    // TODO : 로그인 여부 확인하기
    return false;
  }

  async fetchLoggedInUser() {
    // TODO : 로그인되어 있는 유저 정보 가져오기
    return {} as UserType;
  }
}

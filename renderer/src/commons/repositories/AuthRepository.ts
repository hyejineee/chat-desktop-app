import AuthDataSource from '@dataSources/AuthDataSource';
import {
  IAuthRepository,
  LoginArgsType,
  RegisterUserArgsType,
  UserType,
} from '@type/auth.types';
import APP_TYPES from '@type/container.types';

import { inject, injectable } from 'inversify';

@injectable()
export default class AuthRepository implements IAuthRepository {
  private authDataSource: AuthDataSource;

  private loggedInUser: UserType | null = null;

  constructor(@inject(APP_TYPES.AuthDataSource) dataSource: AuthDataSource) {
    this.authDataSource = dataSource;
  }

  async login(args: LoginArgsType) {
    return this.authDataSource.login(args);
  }

  logout() {
    this.loggedInUser = null;
    this.authDataSource.logout();
  }

  registerUser(args: RegisterUserArgsType) {
    return this.authDataSource.registerUser(args);
  }

  async checkLoggedIn() {
    const user = this.authDataSource.checkLoggedIn();

    if (user !== null && this.loggedInUser) return true;

    if (user !== null && this.loggedInUser === null) {
      const fetchUser = await this.authDataSource.fetchUser(user.uid);
      this.loggedInUser = fetchUser;
      return true;
    }

    this.loggedInUser = null;

    return false;
  }

  async fetchLoggedInUser() {
    const user = this.authDataSource.checkLoggedIn();

    if (user !== null && this.loggedInUser === null) {
      const fetchUser = await this.authDataSource.fetchUser(user.uid);
      this.loggedInUser = fetchUser;

      return fetchUser;
    }

    return this.loggedInUser;
  }
}

export interface IAuthRepository {
  login: (args: LoginArgsType) => Promise<void>;
  logout: () => Promise<void>;
  registerUser: (args: RegisterUserArgsType) => Promise<void>;
  checkLoggedIn: () => Promise<boolean>;
  fetchLoggedInUser: () => Promise<UserType>;
}

export interface IAuthContext {
  login: (args: LoginArgsType) => Promise<void>;
  logout: () => Promise<void>;
  registerUser: (args: RegisterUserArgsType) => Promise<void>;
  checkLoggedIn: () => Promise<boolean>;
  fetchLoggedInUser: () => Promise<UserType>;
}

export type UserType = {
  email: string;
  uid: string;
  nickName: string;
  rooms: string[];
};

export type LoginArgsType = {
  email: string;
  password: string;
};

export type RegisterUserArgsType = {
  email: string;
  password: string;
  nickName: string;
};

export interface IAuthRepository {
  login: (args: LoginArgsType) => Promise<void>;
  logout: () => void;
  registerUser: (args: RegisterUserArgsType) => Promise<void>;
  checkLoggedIn: () => Promise<boolean>;
  fetchLoggedInUser: () => Promise<UserType | null>;
}

export interface IAuthContext {
  login: (args: LoginArgsType) => Promise<void>;
  logout: () => void;
  registerUser: (args: RegisterUserArgsType) => Promise<void>;
  checkLoggedIn: () => Promise<boolean> | undefined;
  fetchLoggedInUser: () => Promise<UserType | null>;
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

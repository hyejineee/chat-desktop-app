import constate from 'constate';

import {
  IAuthContext,
  IAuthRepository,
  LoginArgsType,
  RegisterUserArgsType,
} from '@type/auth';


type UseAuthContextPropsTypes = {
  authRepository: IAuthRepository;
};

const useAuthContext: (props: UseAuthContextPropsTypes) => IAuthContext = ({
  authRepository,
}: UseAuthContextPropsTypes) => {
  const login = async (args: LoginArgsType) => authRepository.login(args);

  const logout = () => authRepository.logout();

  const registerUser = (args: RegisterUserArgsType) =>
    authRepository.registerUser(args);

  const checkLoggedIn = () => authRepository.checkLoggedIn();

  const fetchLoggedInUser = () => authRepository.fetchLoggedInUser();

  return {
    login,
    logout,
    registerUser,
    checkLoggedIn,
    fetchLoggedInUser,
  };
};

export const [
  AuthProvider,
  useLogin,
  useLogout,
  useRegisterUser,
  useCheckLoggedIn,
  useFetchLoggedInUser,
] = constate(
  useAuthContext,
  value => value.login,
  value => value.logout,
  value => value.registerUser,
  value => value.checkLoggedIn,
  value => value.fetchLoggedInUser,
);

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import LoginContainer from '../renderer/src/components/unit/auth/login/Login.container';
import { EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER } from '../renderer/src/commons/constants/placeholder';
import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import { AlertMessageProvider } from '../renderer/src/commons/contexts/AlertMessageContext';
import { AuthProvider } from '../renderer/src/commons/contexts/AuthContext';
import { IAuthRepository } from '../renderer/src/commons/type/auth.types';
import { CHAT_PAGE, REGISTER_USER_PAGE } from '../renderer/src/commons/constants/paths';
import { EMAIL_FORMAT_ERROR, PASSWORD_FORMAT_ERROR } from '../renderer/src/commons/constants/errorMessage';
import AlertMessage from '../renderer/src/components/common/alert/AlertMessage';

describe('LoginContainer', () => {
  const mockAuthRepository: IAuthRepository = mock<IAuthRepository>();

  const renderLoginContainer = (authRepository = mockAuthRepository) => {
    render(
      <AlertMessageProvider>
        <AlertMessage />
        <AuthProvider authRepository={authRepository}>
          <LoginContainer />
        </AuthProvider>
      </AlertMessageProvider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );

    const emailInput = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
    const passwordInput = screen.getByPlaceholderText(PASSWORD_PLACEHOLDER);
    const loginButton = screen.getByText('로그인');
    const signUpButton = screen.getByText('회원가입');

    return {
      emailInput,
      passwordInput,
      loginButton,
      signUpButton,
    };
  };

  beforeEach(() => {
    reset(mockAuthRepository);
  });

  it('이메일을 입력할 수 있다.', async () => {
    const emailValue = 'email';

    const { emailInput } = renderLoginContainer();

    await userEvent.type(emailInput, emailValue);

    expect(emailInput).toHaveDisplayValue(emailValue);
  });

  it('비밀번호를 입력할 수 있다.', async () => {
    const passwordValue = 'password';

    const { passwordInput } = renderLoginContainer();

    await userEvent.type(passwordInput, passwordValue);

    expect(passwordInput).toHaveDisplayValue(passwordValue);
  });

  it('회원가입 버튼을 누르면 회원가입 페이지로 이동한다.', async () => {
    const { signUpButton } = renderLoginContainer();

    await userEvent.click(signUpButton);

    expect(mockRouter.asPath).toEqual(REGISTER_USER_PAGE);
  });

  context('로그인 버튼을 클릭했을 때', () => {
    context('입력값이 올바르면', () => {
      it('로그인 메소드를 실행한다.', async () => {
        const authRepository = instance(mockAuthRepository);

        const { emailInput, passwordInput, loginButton } = renderLoginContainer(authRepository);

        await userEvent.type(emailInput, 'aa@aa.com');
        await userEvent.type(passwordInput, '123qwe123');
        await userEvent.click(loginButton);

        verify(mockAuthRepository.login(anything())).called();
      });
    });

    context('입력값이 올바르지 않으면', () => {
      it('에러 메세지가 보인다.', async () => {
        const { emailInput, passwordInput, loginButton } = renderLoginContainer();

        await userEvent.type(emailInput, 'wrong email');
        await userEvent.type(passwordInput, 'wrong password');
        await userEvent.click(loginButton);

        expect(screen.getByText(EMAIL_FORMAT_ERROR)).toBeInTheDocument();
        expect(screen.getByText(PASSWORD_FORMAT_ERROR)).toBeInTheDocument();
      });
    });
  });

  context('로그인에 성공했을 때', () => {
    it('나의 채팅 리스트 페이지로 이동한다.', async () => {
      when(mockAuthRepository.login(anything())).thenResolve();
      const authRepository = instance(mockAuthRepository);

      const { emailInput, passwordInput, loginButton } = renderLoginContainer(authRepository);

      await userEvent.type(emailInput, 'aa@aa.com');
      await userEvent.type(passwordInput, '123qwe123');
      await userEvent.click(loginButton);

      expect(mockRouter.asPath).toBe(CHAT_PAGE);
    });
  });

  context('로그인에 실패했을 때', () => {
    it('에러 메세지가 보인다.', async () => {
      const errorMessage = 'errorMessage';

      when(mockAuthRepository.login(anything())).thenThrow(new Error(errorMessage));
      const authRepository = instance(mockAuthRepository);

      const { emailInput, passwordInput, loginButton } = renderLoginContainer(authRepository);

      await userEvent.type(emailInput, 'aa@aa.com');
      await userEvent.type(passwordInput, '123qwe123');
      await userEvent.click(loginButton);

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });
  });
});

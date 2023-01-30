import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import mockRouter from 'next-router-mock';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { EMAIL_FORMAT_ERROR, NICKNAME_FORMAT_ERROR, PASSWORD_FORMAT_ERROR, RE_PASSWORD_FORMAT_ERROR } from '../renderer/src/commons/constants/errorMessage';
import { EMAIL_PLACEHOLDER, NICKNAME_PLACEHOLDER, PASSWORD_PLACEHOLDER, RE_PASSWORD_PLACEHOLDER } from '../renderer/src/commons/constants/placeholder';
import { AlertMessageProvider } from '../renderer/src/commons/contexts/AlertMessageContext';
import { AuthProvider } from '../renderer/src/commons/contexts/AuthContext';
import { IAuthRepository } from '../renderer/src/commons/type/auth.types';
import RegisterUserContainer from '../renderer/src/components/unit/auth/register/RegisterUser.container';
import { LOGIN_PAGE } from '../renderer/src/commons/constants/paths';
import AlertMessage from '../renderer/src/components/common/alert/AlertMessage';

describe('RegisterUserContainer', () => {
  const mockAuthRepository: IAuthRepository = mock<IAuthRepository>();

  const renderComponent = (authRepository: IAuthRepository = mockAuthRepository) => {
    render(
      <AlertMessageProvider>
        <AlertMessage />
        <AuthProvider authRepository={authRepository}>
          <RegisterUserContainer />
        </AuthProvider>
      </AlertMessageProvider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );

    const emailInput = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
    const nickNameInput = screen.getByPlaceholderText(NICKNAME_PLACEHOLDER);
    const passwordInput = screen.getByPlaceholderText(PASSWORD_PLACEHOLDER);
    const repasswordInput = screen.getByPlaceholderText(RE_PASSWORD_PLACEHOLDER);
    const signUpButton = screen.getByText('회원가입');

    return {
      emailInput,
      nickNameInput,
      passwordInput,
      repasswordInput,
      signUpButton,
    };
  };

  it('이메일을 입력할 수 있다.', async () => {
    const value = 'value';

    const { emailInput } = renderComponent();

    await userEvent.type(emailInput, value);

    expect(emailInput).toHaveDisplayValue(value);
  });

  it('닉넴임을 입력할 수 있다.', async () => {
    const value = 'value';

    const { nickNameInput } = renderComponent();

    await userEvent.type(nickNameInput, value);

    expect(nickNameInput).toHaveDisplayValue(value);
  });

  it('비밀번호를 입력할 수 있다.', async () => {
    const value = 'value';

    const { passwordInput } = renderComponent();

    await userEvent.type(passwordInput, value);

    expect(passwordInput).toHaveDisplayValue(value);
  });

  it('비밀번호를 다시 입력할 수 있다.', async () => {
    const value = 'value';

    const { repasswordInput } = renderComponent();

    await userEvent.type(repasswordInput, value);

    expect(repasswordInput).toHaveDisplayValue(value);
  });

  context('회원가입 버튼을 클릭했을 때', () => {
    context('입력값이 올바르면', () => {
      it('회원가입 메소드를 실행한다.', async () => {
        const authRepository = instance(mockAuthRepository);

        const { emailInput, passwordInput, nickNameInput, repasswordInput, signUpButton } = renderComponent(authRepository);

        await userEvent.type(emailInput, 'aa@aa.com');
        await userEvent.type(nickNameInput, 'test');
        await userEvent.type(passwordInput, '123qwe123');
        await userEvent.type(repasswordInput, '123qwe123');
        await userEvent.click(signUpButton);

        verify(mockAuthRepository.registerUser(anything())).called();
      });
    });

    context('입력값이 올바르지 않으면', () => {
      it('에러 메세지가 보인다.', async () => {
        const { emailInput, passwordInput, nickNameInput, repasswordInput, signUpButton } = renderComponent();

        await userEvent.type(emailInput, 'wrong email');
        await userEvent.type(nickNameInput, 'too long nickname');
        await userEvent.type(passwordInput, 'wrong password');
        await userEvent.type(repasswordInput, 'incorrect password');
        await userEvent.click(signUpButton);

        expect(screen.getByText(EMAIL_FORMAT_ERROR)).toBeInTheDocument();
        expect(screen.getByText(NICKNAME_FORMAT_ERROR)).toBeInTheDocument();
        expect(screen.getByText(PASSWORD_FORMAT_ERROR)).toBeInTheDocument();
        expect(screen.getByText(RE_PASSWORD_FORMAT_ERROR)).toBeInTheDocument();
      });
    });
  });

  context('회원가입에 성공하면', () => {
    it('로그인 페이지로 이동한다.', async () => {
      when(mockAuthRepository.registerUser(anything())).thenResolve();
      const authRepository = instance(mockAuthRepository);

      const { emailInput, passwordInput, nickNameInput, repasswordInput, signUpButton } = renderComponent(authRepository);

      await userEvent.type(emailInput, 'aa@aa.com');
      await userEvent.type(nickNameInput, 'test');
      await userEvent.type(passwordInput, '123qwe123');
      await userEvent.type(repasswordInput, '123qwe123');
      await userEvent.click(signUpButton);

      expect(mockRouter.asPath).toBe(LOGIN_PAGE);
    });
  });

  context('회원가입에 실패하면', () => {
    it('에러 메세지가 보인다.', async () => {
      const errorMessage = 'errorMessage';

      when(mockAuthRepository.registerUser(anything())).thenThrow(new Error(errorMessage));

      const authRepository = instance(mockAuthRepository);

      const { emailInput, passwordInput, nickNameInput, repasswordInput, signUpButton } = renderComponent(authRepository);

      await userEvent.type(emailInput, 'aa@aa.com');
      await userEvent.type(nickNameInput, 'test');
      await userEvent.type(passwordInput, '123qwe123');
      await userEvent.type(repasswordInput, '123qwe123');
      await userEvent.click(signUpButton);

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });
  });
});

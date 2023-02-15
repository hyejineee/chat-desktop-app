import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import mockRouter from 'next-router-mock';
import { mock } from 'ts-mockito';
import { AuthProvider } from '../renderer/src/commons/contexts/AuthContext';
import { IAuthRepository } from '../renderer/src/commons/type/auth.types';
import SettingContainer from '../renderer/src/components/unit/setting/Setting.container';
import { LOGIN_PAGE } from '../renderer/src/commons/constants/paths';

export {};

describe('SettingContainer', () => {
  const mockAuthRepository = mock<IAuthRepository>();

  it('로그아웃을 할 수 있다.', async () => {
    render(
      <AuthProvider authRepository={mockAuthRepository}>
        <SettingContainer />
      </AuthProvider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );

    const logoutButton = screen.getByRole('button');
    await userEvent.click(logoutButton);

    expect(mockRouter.asPath).toBe(LOGIN_PAGE);
  });
});

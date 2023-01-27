import { render, screen } from '@testing-library/react';
import LoginContainer from '../renderer/src/components/unit/auth/login/Login.container';

describe('LoginContainer', () => {
  const renderLoginContainer = () => {
    render(<LoginContainer />);
  };

  it('이메일을 입력할 수 있다.', () => {
    renderLoginContainer();
  });
});

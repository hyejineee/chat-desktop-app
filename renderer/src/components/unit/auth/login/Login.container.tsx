import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { CHAT_PAGE, REGISTER_USER_PAGE } from '@constants/paths';
import { useLogin } from '@contexts/AuthContext';
import { LoginArgsType } from '@type/auth.types';
import { Button } from 'antd';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@utils/yupSchema';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import NormalInput from 'src/components/common/inputs/NormalInput/NormalInput';
import {
  ErrorText,
  InputWrapper,
} from 'src/components/common/styles/common.styles';
import { useShowAlertMessage } from '@contexts/AlertMessageContext';
import {
  EMAIL_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
} from '@constants/placeholder';
import * as S from './Login.styles';

export default function LoginContainer() {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const router = useRouter();
  const login = useLogin();
  const showAlert = useShowAlertMessage();

  const handleClickLogin = handleSubmit(async (inputs: any) => {
    try {
      await login(inputs as LoginArgsType);
      router.push(CHAT_PAGE);
    } catch (e) {
      if (e instanceof Error) {
        showAlert('error', e.message);
      }
    }
  });

  return (
    <S.Wrapper>
      <S.Title>MAUM CHAT</S.Title>
      <S.LoginFormWrapper>
        <InputWrapper>
          <NormalInput
            type='email'
            name='email'
            control={control}
            placeholder={EMAIL_PLACEHOLDER}
            prefix={<UserOutlined />}
          />
          <ErrorText>{String(formState.errors.email?.message || '')}</ErrorText>
        </InputWrapper>

        <InputWrapper marginBottom={32}>
          <NormalInput
            type='password'
            name='password'
            control={control}
            placeholder={PASSWORD_PLACEHOLDER}
            prefix={<LockOutlined />}
          />
          <ErrorText>
            {String(formState.errors.password?.message || '')}
          </ErrorText>
        </InputWrapper>

        <S.ButtonWrapper>
          <Button
            type='primary'
            shape='round'
            htmlType='submit'
            onClick={handleClickLogin}
            style={{ width: '100%' }}
          >
            로그인
          </Button>
        </S.ButtonWrapper>

        <S.RegisterGuidanceWrpper>
          아직 계정이 없으신가요?{' '}
          <u style={{ cursor: 'pointer' }}>
            <Link href={REGISTER_USER_PAGE}>회원가입</Link>
          </u>
        </S.RegisterGuidanceWrpper>
      </S.LoginFormWrapper>
    </S.Wrapper>
  );
}

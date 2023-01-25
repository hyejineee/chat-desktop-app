import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { CHAT_PAGE, REGISTER_USER_PAGE } from '@constants/paths';
import { useLogin } from '@contexts/AuthContext';
import { LoginArgsType } from '@type/auth';
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
import * as S from './Login.styles';

export default function LoginContainer() {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const router = useRouter();
  const login = useLogin();

  const handleClickLogin = handleSubmit(async (inputs: any) => {
    try {
      await login(inputs as LoginArgsType);
      router.push(CHAT_PAGE);
    } catch (e) {
      // TODO : 에러 메세지 띄우기
      console.log(e);
    }
  });

  return (
    <S.Wrapper>
      <S.LoginFormWrapper>
        <InputWrapper>
          <NormalInput
            type='email'
            name='email'
            control={control}
            placeholder='이메일을 입력해 주세요.'
            prefix={<UserOutlined />}
          />
          <ErrorText>{String(formState.errors.email?.message || '')}</ErrorText>
        </InputWrapper>

        <InputWrapper marginBottom={32}>
          <NormalInput
            type='password'
            name='password'
            control={control}
            placeholder='비밀번호를 입력해 주세요.'
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
          <Link href={REGISTER_USER_PAGE}>
            <u>회원가입</u>
          </Link>
        </S.RegisterGuidanceWrpper>
      </S.LoginFormWrapper>
    </S.Wrapper>
  );
}

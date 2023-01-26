import { LOGIN_PAGE } from '@constants/paths';
import { useRegisterUser } from '@contexts/AuthContext';
import { RegisterUserArgsType } from '@type/auth';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUserSchema } from '@utils/yupSchema';
import NormalInput from 'src/components/common/inputs/NormalInput/NormalInput';
import {
  ErrorText,
  InputWrapper,
} from 'src/components/common/styles/common.styles';
import { useShowAlertMessage } from '@contexts/AlertMessageContext';
import * as S from './RegisterUser.styles';

export default function RegisterUserContainer() {
  const { control, formState, handleSubmit } = useForm({
    resolver: yupResolver(registerUserSchema),
    mode: 'onChange',
  });

  const router = useRouter();
  const registerUser = useRegisterUser();
  const showAlert = useShowAlertMessage();

  const handleClickRegister = handleSubmit(async (inputs: any) => {
    const args: RegisterUserArgsType = {
      email: String(inputs.email),
      password: String(inputs.password),
      nickName: String(inputs.nickName),
    };

    try {
      await registerUser(args);
      router.replace(LOGIN_PAGE);
    } catch (e) {
      if (e instanceof Error) {
        showAlert('error', e.message);
      }
    }
  });

  return (
    <S.Wrapper>
      <S.RegisterFormWrapper>
        <InputWrapper>
          <NormalInput
            type='email'
            name='email'
            control={control}
            placeholder='이메일을 입력해 주세요.'
          />
          <ErrorText>{String(formState.errors.email?.message || '')}</ErrorText>
        </InputWrapper>

        <InputWrapper>
          <NormalInput
            name='nickName'
            control={control}
            placeholder='닉네임을 입력해 주세요.'
          />
          <ErrorText>
            {String(formState.errors.nickName?.message || '')}
          </ErrorText>
        </InputWrapper>

        <InputWrapper>
          <NormalInput
            type='password'
            name='password'
            control={control}
            placeholder='비밀번호를 입력해 주세요.'
          />
          <ErrorText>
            {String(formState.errors.password?.message || '')}
          </ErrorText>
        </InputWrapper>

        <InputWrapper>
          <NormalInput
            type='password'
            name='passwordCheck'
            control={control}
            placeholder='비밀번호를 다시 입력해 주세요.'
          />
          <ErrorText>
            {String(formState.errors.passwordCheck?.message || '')}
          </ErrorText>
        </InputWrapper>

        <S.ButtonWrapper>
          <Button
            type='primary'
            shape='round'
            htmlType='submit'
            onClick={handleClickRegister}
            style={{ width: '100%' }}
          >
            회원가입
          </Button>
        </S.ButtonWrapper>
      </S.RegisterFormWrapper>
    </S.Wrapper>
  );
}

import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('올바른 이메일을 입력해 주세요.')
    .required('이메일을 입력해 주세요.'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
      '영문, 숫자 조합 8~16 자리의 비밀번호를 입력해 주세요.',
    )
    .required('비밀번호를 입력해 주세요.'),
});

export const registerUserSchema = yup.object().shape({
  nickName: yup
    .string()
    .max(10, '닉네임은 10자 미만 문자여야 합니다.')
    .required('닉네임을 입력해주세요.'),
  email: yup
    .string()
    .email('올바른 이메일을 입력해 주세요.')
    .required('이메일을 입력해 주세요.'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
      '영문, 숫자 조합 8~16 자리의 비밀번호를 입력해 주세요.',
    )
    .required('비밀번호를 입력해 주세요.'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 확인해주세요.'),
});

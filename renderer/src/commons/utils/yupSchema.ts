import {
  EMAIL_FORMAT_ERROR,
  EMAIL_REQUIRED_ERROR,
  NICKNAME_FORMAT_ERROR,
  NICKNAME_REQUIRED_ERROR,
  PASSWORD_FORMAT_ERROR,
  PASSWORD_REQUIRED_ERROR,
  RE_PASSWORD_FORMAT_ERROR,
  RE_PASSWORD_REQUIRED_ERROR,
} from '@constants/errorMessage';
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email(EMAIL_FORMAT_ERROR).required(EMAIL_REQUIRED_ERROR),
  password: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/, PASSWORD_FORMAT_ERROR)
    .required(PASSWORD_REQUIRED_ERROR),
});

export const registerUserSchema = yup.object().shape({
  nickName: yup
    .string()
    .max(10, NICKNAME_FORMAT_ERROR)
    .required(NICKNAME_REQUIRED_ERROR),
  email: yup.string().email(EMAIL_FORMAT_ERROR).required(EMAIL_REQUIRED_ERROR),
  password: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/, PASSWORD_FORMAT_ERROR)
    .required(PASSWORD_REQUIRED_ERROR),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), null], RE_PASSWORD_FORMAT_ERROR)
    .required(RE_PASSWORD_REQUIRED_ERROR),
});

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StylePropsType } from '@type/style.types';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 32px;
`;

export const LoginFormWrapper = styled.form`
  width: 80%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  width: 50%;
`;

export const RegisterGuidanceWrpper = styled.p`
  color: gray;
  font-size: 12px;
  margin-top: 32px;
`;

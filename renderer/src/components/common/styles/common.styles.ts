import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StylePropsType } from '@type/style';

export const ErrorText = styled.p`
  color: red;
  font-size: 10px;
`;

export const InputWrapper = styled.div(
  (props: StylePropsType) => css`
    width: 100%;
    margin-bottom: ${props.marginBottom || 4}px;
  `,
);

export const TitleText = styled.h1`
  font-size: 28px;
  font-weight: 900;
  color: #292d32;
`;

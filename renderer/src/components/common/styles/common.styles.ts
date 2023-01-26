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

export const GuidanceText = styled.p`
  color: gray;
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: 24px;
  line-height: 20px;
`;

export const CircleView = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 900;
`;
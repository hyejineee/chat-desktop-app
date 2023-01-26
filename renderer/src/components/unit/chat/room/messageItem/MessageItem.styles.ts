import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  margin: 16px 0;
  gap: 8px;
  align-items: flex-start;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const NickNameWrapper = styled.p`
  font-size: 14px;
  font-weight: 900;
  margin-top: 3px;
`;

export const MessageWrapper = styled.div`
  max-width: 50%;
  background-color: #eaeeff;
  padding: 8px 16px;
  border-radius: 16px;
  margin-top: 8px;
  font-size: 12px;
  word-break: break-all;
  word-wrap: break-word;
`;

export const TimestampText = styled.div`
  font-size: 10px;
  color: #d9d9d9;
`;

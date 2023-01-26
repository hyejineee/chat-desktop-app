import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 8px 0;
  gap: 16px;
  align-items: center;
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

export const TitleWrapper = styled.p`
  font-size: 14px;
  font-weight: 800;
`;

export const MessageWrapper = styled.p`
  font-size: 12px;
  color: gray;
`;

export const DateWrapper = styled.p`
  font-size: 10px;
  color: gray;
  align-self: flex-start;
  justify-self: flex-end;
  margin-top: 5px;
`;

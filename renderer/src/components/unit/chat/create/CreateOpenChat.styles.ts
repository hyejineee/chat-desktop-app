import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;

`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
`;

export const InputWrapper = styled.div`
  margin-bottom: 24px;
`;

export const LabelTextWrapper = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: gray;
  margin-bottom: 8px;
  margin-top: 24px;
`;

export const SelectedUserListWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 70px;
  width: 100%;
  overflow-x: scroll;
  padding: 5px;
  margin-bottom: 16px;
`;

export const UserListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 6px;
`;

export const SelectedUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 6px;
  p {
    font-size: 14px;
  }
`;

export const DoneButtonWrapper = styled.button`
  color: #1890ff;
`;

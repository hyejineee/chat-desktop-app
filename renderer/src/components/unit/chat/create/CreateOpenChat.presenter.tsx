import { TITLE_PLACEHOLDER } from '@constants/placeholder';
import { UserType } from '@type/auth.types';
import { Checkbox } from 'antd';
import _ from 'lodash';
import randomColor from 'randomcolor';
import { useMemo } from 'react';
import { Control, FieldValues } from 'react-hook-form';
import NormalInput from 'src/components/common/inputs/NormalInput/NormalInput';
import UserItem from 'src/components/common/items/userItem/UserItem';

import { TitleText } from 'src/components/common/styles/common.styles';
import * as S from './CreateOpenChat.styles';

type CreateOpenChatUIPropsType = {
  userList: UserType[];
  selectedUserList: UserType[];
  control: Control<FieldValues, any>;
  onClickCreate: () => void;
  onClickUserItem: (user: UserType) => () => void;
};

export default function CreateOpenChatUI({
  control,
  userList,
  selectedUserList,
  onClickCreate,
  onClickUserItem,
}: CreateOpenChatUIPropsType) {
  const color = useMemo(
    () =>
      randomColor({
        luminosity: 'dark',
        hue: 'random',
        format: 'rgba',
        alpha: 0.5,
      }),
    [],
  );

  return (
    <S.Wrapper>
      <S.HeaderWrapper>
        <TitleText>
          💬
          <br />
          오픈 채팅방 <br />
          생성
        </TitleText>
        <S.DoneButtonWrapper type='button' onClick={onClickCreate}>
          완료
        </S.DoneButtonWrapper>
      </S.HeaderWrapper>

      <S.LabelTextWrapper>제목</S.LabelTextWrapper>
      <S.InputWrapper>
        <NormalInput
          control={control}
          name='title'
          placeholder={TITLE_PLACEHOLDER}
        />
      </S.InputWrapper>

      <S.LabelTextWrapper>초대 유저</S.LabelTextWrapper>
      <S.SelectedUserListWrapper>
        {selectedUserList?.map(user => (
          <S.SelectedUserWrapper key={user.uid}>
            <S.UserImageWrapper style={{ backgroundColor: color }}>
              {user.nickName[0]}
            </S.UserImageWrapper>
            <p>{user.nickName}</p>
          </S.SelectedUserWrapper>
        ))}
      </S.SelectedUserListWrapper>

      <S.LabelTextWrapper>유저 리스트</S.LabelTextWrapper>
      <S.UserListWrapper>
        {userList?.map(user => (
          <button key={user.uid} type='button' onClick={onClickUserItem(user)}>
            <UserItem user={user}>
              <Checkbox checked={_.includes(selectedUserList, user)} />
            </UserItem>
          </button>
        ))}
      </S.UserListWrapper>
    </S.Wrapper>
  );
}

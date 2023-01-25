import { SendOutlined } from '@ant-design/icons';
import { UserType } from '@type/auth';
import { ReactNode, useMemo } from 'react';
import randomColor from 'randomcolor';
import * as S from './UserItem.styles';

type UserItemPropsType = {
  user: UserType;
  children: ReactNode;
};

export default function UserItem({ user, children }: UserItemPropsType) {
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
      <S.ProfileImageWrapper style={{ backgroundColor: color }}>
        {user.nickName[0]}
      </S.ProfileImageWrapper>
      <S.NickNameWrapper>{user.nickName}</S.NickNameWrapper>
      {children}
    </S.Wrapper>
  );
}

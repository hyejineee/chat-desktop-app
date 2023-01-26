import { SendOutlined } from '@ant-design/icons';
import { UserType } from '@type/auth';
import UserItem from 'src/components/common/items/userItem/UserItem';

import {
  GuidanceText,
  TitleText,
} from 'src/components/common/styles/common.styles';
import * as S from './UserList.styles';

type UserListUIPropsType = {
  userList: UserType[] | null;
  onClickPersonalChat: (uid: string, nickName: string) => () => void;
};
export default function UserListUI({
  userList,
  onClickPersonalChat,
}: UserListUIPropsType) {
  return (
    <S.Wrapper>
      <TitleText>
        👀 <br />
        유저 리스트
      </TitleText>

      <GuidanceText>관심 있는 유저에게 메시지를 보내보세요!</GuidanceText>
      {(userList || []).map(user => (
        <UserItem key={user.uid} user={user}>
          <button
            type='button'
            onClick={onClickPersonalChat(user.uid, user.nickName)}
          >
            <SendOutlined />
          </button>
        </UserItem>
      ))}
    </S.Wrapper>
  );
}

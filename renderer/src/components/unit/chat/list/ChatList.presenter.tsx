import { PlusOutlined } from '@ant-design/icons';
import { RoomType } from '@type/room';
import ChatRoomItem from 'src/components/unit/chat/list/chatRoomItem/ChatRoomItem';
import {
  GuidanceText,
  TitleText,
} from 'src/components/common/styles/common.styles';
import * as S from './ChatList.styles';

type ChatListUIPropsType = {
  roomList: RoomType[] | null;
  title: string;
  subTitle: string;
  onClickRoomItem: (room: RoomType) => () => void;
  onClickCreateOpenChat: () => void;
};

export default function ChatListUI({
  roomList,
  title,
  subTitle,
  onClickRoomItem,
  onClickCreateOpenChat,
}: ChatListUIPropsType) {
  return (
    <S.Wrapper>
      <S.HeaderWrapper>
        <div>
          <TitleText>
            📮 <br />
            {title}
          </TitleText>
          <GuidanceText dangerouslySetInnerHTML={{ __html: subTitle }} />
        </div>
        {title.includes('나의 채팅 리스트') || (
          <S.AddOpenChatButtonWrapper onClick={onClickCreateOpenChat}>
            <PlusOutlined />
          </S.AddOpenChatButtonWrapper>
        )}
      </S.HeaderWrapper>

      <S.ChatListWrapper>
        {(roomList || []).map(room => (
          <button key={room.uid} type='button' onClick={onClickRoomItem(room)}>
            <ChatRoomItem room={room} />
          </button>
        ))}
      </S.ChatListWrapper>
    </S.Wrapper>
  );
}

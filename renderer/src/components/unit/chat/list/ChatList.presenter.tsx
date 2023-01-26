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
  onClickRoomItem: (roomId: string, type: string) => () => void;
  onClickCreateOpenChat: () => void;
};

export default function ChatListUI({
  roomList,
  onClickRoomItem,
  onClickCreateOpenChat,
}: ChatListUIPropsType) {
  return (
    <S.Wrapper>
      <S.HeaderWrapper>
        <div>
          <TitleText>
            📮 <br />
            채팅 리스트
          </TitleText>
          <GuidanceText>
            어떤 새로운 메시지가 왔을까요? 확인해 보세요! <br />+ 버튼으로
            새로운 오픈 채팅방을 만들 수 있어요!
          </GuidanceText>
        </div>
        <S.AddOpenChatButtonWrapper onClick={onClickCreateOpenChat}>
          <PlusOutlined />
        </S.AddOpenChatButtonWrapper>
      </S.HeaderWrapper>

      <S.ChatListWrapper>
        {(roomList || []).map(room => (
          <button
            key={room.uid}
            type='button'
            onClick={onClickRoomItem(room?.uid, room.type)}
          >
            <ChatRoomItem room={room} />
          </button>
        ))}
      </S.ChatListWrapper>
    </S.Wrapper>
  );
}

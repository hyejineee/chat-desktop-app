import { UserType } from '@type/auth';
import { MessageType } from '@type/message';
import { Button, Input } from 'antd';
import { Control, FieldValues } from 'react-hook-form';
import NormalInput from 'src/components/common/inputs/NormalInput/NormalInput';
import * as S from './ChatRoom.styles';
import MessageItem from './messageItem/MessageItem';

type ChatRoomUIPropsType = {
  loggedInUser: UserType | null;
  control: Control<FieldValues, any>;
  messageList: MessageType[] | null;
  onClickSend: () => void;
};
export default function ChatRoomUI({
  loggedInUser,
  control,
  messageList,
  onClickSend,
}: ChatRoomUIPropsType) {
  return (
    <S.Wrapper>
      <S.MessagesWrapper>
        {(messageList || [])?.map(message => (
          <MessageItem
            key={message.id}
            message={message}
            isMine={message?.senderUid?.includes(loggedInUser?.uid || '')}
          />
        ))}
      </S.MessagesWrapper>
      <S.InputWrapper>
        <NormalInput control={control} name='message' />
        <Button type='primary' shape='round' onClick={onClickSend}>
          전송
        </Button>
      </S.InputWrapper>
    </S.Wrapper>
  );
}

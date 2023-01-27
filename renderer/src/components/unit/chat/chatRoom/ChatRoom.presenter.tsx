import { UserType } from '@type/auth.types';
import { MessageType } from '@type/message.types';
import { Button, Input } from 'antd';
import { useEffect, useRef } from 'react';
import { Control, FieldValues } from 'react-hook-form';
import NormalInput from 'src/components/common/inputs/NormalInput/NormalInput';
import * as S from './ChatRoom.styles';
import MessageItem from './messageItem/MessageItem';

type ChatRoomUIPropsType = {
  title: string;
  loggedInUser: UserType | null;
  control: Control<FieldValues, any>;
  messageList: MessageType[] | null;
  onClickSend: () => void;
};
export default function ChatRoomUI({
  title,
  loggedInUser,
  control,
  messageList,
  onClickSend,
}: ChatRoomUIPropsType) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <S.Wrapper>
      <S.TitleWrapper>💬 {title}</S.TitleWrapper>
      <S.MessagesWrapper>
        {(messageList || [])?.map(message => (
          <MessageItem
            key={message.id}
            message={message}
            isMine={message?.senderUid?.includes(loggedInUser?.uid || '')}
          />
        ))}
        <div ref={bottomRef} />
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

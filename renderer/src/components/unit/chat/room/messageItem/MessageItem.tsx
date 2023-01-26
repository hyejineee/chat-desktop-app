import { MessageType } from '@type/message';
import randomColor from 'randomcolor';
import { useMemo } from 'react';
import { CircleView } from 'src/components/common/styles/common.styles';
import * as S from './MessageItem.styles';

type MessageItemPropsType = {
  message: MessageType;
  isMine: boolean;
};

export default function MessageItem({ message, isMine }: MessageItemPropsType) {
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
      {isMine || (
        <CircleView style={{ backgroundColor: color }}>
          {message?.nickName?.[0]}
        </CircleView>
      )}

      <S.Box style={{ alignItems: isMine ? 'flex-end' : 'flex-start' }}>
        {isMine || <S.NickNameWrapper>{message.nickName}</S.NickNameWrapper>}
        <S.MessageWrapper>{message.content}</S.MessageWrapper>
      </S.Box>
    </S.Wrapper>
  );
}

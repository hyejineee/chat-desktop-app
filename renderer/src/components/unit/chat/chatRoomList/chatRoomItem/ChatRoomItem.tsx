import { RoomType } from '@type/room.types';
import randomColor from 'randomcolor';
import { useMemo } from 'react';
import { CircleView } from '../../../../common/styles/common.styles';
import * as S from './ChatRoomItem.styles';

type ChatRoomItemPropsType = {
  room: RoomType;
};
export default function ChatRoomItem({ room }: ChatRoomItemPropsType) {

  console.log(room);
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
      <CircleView style={{ backgroundColor: color }}>
        {room?.title?.[0] || room?.users?.[0]?.nickName[0]}
      </CircleView>

      <S.ContentsWrapper>
        <S.TitleWrapper>
          {room.title || room?.users?.[0]?.nickName}
        </S.TitleWrapper>
        <S.MessageWrapper>
          {room.messages?.[room.messages.length - 1]?.content}
        </S.MessageWrapper>
      </S.ContentsWrapper>

      <S.DateWrapper>
        {String(room.messages?.[room.messages.length - 1]?.timestamp) || ''}
      </S.DateWrapper>
    </S.Wrapper>
  );
}

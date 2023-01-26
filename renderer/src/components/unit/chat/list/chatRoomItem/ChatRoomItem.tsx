import { RoomType } from '@type/room';
import randomColor from 'randomcolor';
import { useMemo } from 'react';
import moment from 'moment';
import { CircleView } from '../../../../common/styles/common.styles';
import * as S from './ChatRoomItem.styles';

type ChatRoomItemPropsType = {
  room: RoomType;
};
export default function ChatRoomItem({ room }: ChatRoomItemPropsType) {
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
        {room?.title?.[0] || 'P'}
      </CircleView>

      <S.ContentsWrapper>
        <S.TitleWrapper>{room.title || 'Personal'}</S.TitleWrapper>
        <S.MessageWrapper>
          {room.messages?.[room.messages.length - 1]?.content}
        </S.MessageWrapper>
      </S.ContentsWrapper>

      <S.DateWrapper>
        {moment(
          room.messages?.[room.messages.length - 1]?.timestamp.toDate(),
        ).format('YYYY.MM.DD')}
      </S.DateWrapper>
    </S.Wrapper>
  );
}

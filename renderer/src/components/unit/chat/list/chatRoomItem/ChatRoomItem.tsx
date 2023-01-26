import { RoomType } from '@type/room';
import randomColor from 'randomcolor';
import { useMemo } from 'react';
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
      <CircleView style={{ backgroundColor: color }}>t</CircleView>
      <S.ContentsWrapper>
        <S.TitleWrapper>{room.title}</S.TitleWrapper>
        <S.MessageWrapper>sadfasdf</S.MessageWrapper>
      </S.ContentsWrapper>
    </S.Wrapper>
  );
}

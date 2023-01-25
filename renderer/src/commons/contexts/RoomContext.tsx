import { IRoomContext, IRoomRepository } from '@type/room';
import constate from 'constate';

type UseRoomContextPropsType = {
  roomRepository: IRoomRepository;
};
const useRoomContext: (props: UseRoomContextPropsType) => IRoomContext = ({
  roomRepository,
}: UseRoomContextPropsType) => {
  const createPersonalChatRoom = (pairUid: string) =>
    roomRepository.createPersonalChatRoom(pairUid);

  return {
    createPersonalChatRoom,
  };
};

export const [RoomProvider, useCreatePersonalChatRoom] = constate(
  useRoomContext,
  value => value.createPersonalChatRoom,
);

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

  const createOpenChatRoom = (uids: string[], title: string) =>
    roomRepository.createOpenChatRoom(uids, title);

  return {
    createPersonalChatRoom,
    createOpenChatRoom,
  };
};

export const [RoomProvider, useCreatePersonalChatRoom, useCreateOpenChatRoom] =
  constate(
    useRoomContext,
    value => value.createPersonalChatRoom,
    value => value.createOpenChatRoom,
  );

import { IRoomContext, IRoomRepository, RoomType } from '@type/room';
import constate from 'constate';
import { useState } from 'react';

type UseRoomContextPropsType = {
  roomRepository: IRoomRepository;
};
const useRoomContext: (props: UseRoomContextPropsType) => IRoomContext = ({
  roomRepository,
}: UseRoomContextPropsType) => {
  const [userRooms, setUserRooms] = useState<RoomType[] | null>(null);
  const [openRooms, setOpenRooms] = useState<RoomType[] | null>(null);

  const createPersonalChatRoom = (pairUid: string) =>
    roomRepository.createPersonalChatRoom(pairUid);

  const createOpenChatRoom = (uids: string[], title: string) =>
    roomRepository.createOpenChatRoom(uids, title);

  const fetchAllChatRoomsByUser = async () => {
    const rooms = await roomRepository.fetchAllChatRoomsByUser();

    setUserRooms(rooms);
  };

  const fetchOpenChatRooms = async () => {
    const rooms = await roomRepository.fetchOpenChatRooms();
    setOpenRooms(rooms);
  };
  return {
    userRooms,
    openRooms,
    createPersonalChatRoom,
    createOpenChatRoom,
    fetchAllChatRoomsByUser,
    fetchOpenChatRooms,
  };
};

export const [
  RoomProvider,
  useUserRooms,
  useOpenRooms,
  useCreatePersonalChatRoom,
  useCreateOpenChatRoom,
  useFetchAllChatRoomsByUser,
  useFetchOpenChatRooms,
] = constate(
  useRoomContext,
  value => value.userRooms,
  value => value.openRooms,
  value => value.createPersonalChatRoom,
  value => value.createOpenChatRoom,
  value => value.fetchAllChatRoomsByUser,
  value => value.fetchOpenChatRooms,
);

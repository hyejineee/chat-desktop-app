import RoomDataSource from '@dataSources/RoomDataSource';
import * as authTypes from '@type/auth.types';
import APP_TYPES from '@type/container.types';
import { IRoomRepository } from '@type/room.types';
import { inject, injectable } from 'inversify';

@injectable()
export default class RoomRepository implements IRoomRepository {
  private roomDataSource: RoomDataSource;

  private authRepository: authTypes.IAuthRepository;

  constructor(
    @inject(APP_TYPES.RoomDataSource) roomDataSource: RoomDataSource,
    @inject(APP_TYPES.IAuthRepository)
    authRepository: authTypes.IAuthRepository,
  ) {
    this.roomDataSource = roomDataSource;
    this.authRepository = authRepository;
  }

  async fetchAllChatRoomsByUser() {
    const currentUserUid = await this.authRepository.fetchLoggedInUser();

    if (!currentUserUid) throw Error('채팅방 목록을 가져올 수 없습니다.');

    return this.roomDataSource.fetchAllRoomsByUser(currentUserUid.uid);
  }

  async fetchOpenChatRooms() {
    return this.roomDataSource.fetchOpenChatRooms();
  }

  async createOpenChatRoom(uids: string[], title: string) {
    const currentUser = await this.authRepository.fetchLoggedInUser();

    if (!currentUser) throw Error('채팅방 생성에 실패했습니다.');

    return this.roomDataSource.createOpenChatRoom(uids, title, currentUser.uid);
  }

  async createPersonalChatRoom(pairUid: string) {
    const currentUser = await this.authRepository.fetchLoggedInUser();

    if (!currentUser) throw Error('채팅방 생성에 실패했습니다.');

    return this.roomDataSource.createPersonalChatRoom(currentUser.uid, pairUid);
  }

  async enterOpenChatRoom(roomId: string) {
    const currentUser = await this.authRepository.fetchLoggedInUser();

    if (!currentUser) throw Error('채팅방 입장에 실패했습니다.');

    return this.roomDataSource.enterOpenChatRoom(roomId, currentUser.uid);
  }
}

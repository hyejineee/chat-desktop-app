import RoomDataSource from '@dataSources/RoomDataSource';
import { IAuthRepository } from '@type/auth';
import { IRoomRepository, RoomType } from '@type/room';

export default class RoomRepository implements IRoomRepository {
  private roomDataSource: RoomDataSource;

  private authRepository: IAuthRepository;

  constructor(roomDataSource: RoomDataSource, authRepository: IAuthRepository) {
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

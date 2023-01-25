import RoomDataSource from '@dataSources/RoomDataSource';
import { IAuthRepository } from '@type/auth';
import { IRoomRepository } from '@type/room';

export default class RoomRepository implements IRoomRepository {
  private roomDataSource: RoomDataSource;

  private authRepository: IAuthRepository;

  constructor(roomDataSource: RoomDataSource, authRepository: IAuthRepository) {
    this.roomDataSource = roomDataSource;
    this.authRepository = authRepository;
  }

  async createOpenChatRoom(uids: string[], title: string) {
    const currentUserUid = this.authRepository.fetchLoggedInUser()?.uid;

    if (!currentUserUid) throw Error('채팅방 생성에 실패했습니다.');

    return this.roomDataSource.createOpenChatRoom(uids, title, currentUserUid);
  }

  async createPersonalChatRoom(pairUid: string) {
    const currentUserUid = this.authRepository.fetchLoggedInUser()?.uid;

    if (!currentUserUid) throw Error('채팅방 생성에 실패했습니다.');

    return this.roomDataSource.createPersonalChatRoom(currentUserUid, pairUid);
  }
}

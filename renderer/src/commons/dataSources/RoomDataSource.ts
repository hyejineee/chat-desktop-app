import {
  addDoc,
  collection,
  DocumentData,
  Firestore,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore';

export default class RoomDataSource {
  private store: Firestore;

  private COLLECTION = 'PersonalChatRooms';

  constructor(store: Firestore) {
    this.store = store;
  }

  /**
   * 1: 1 채팅방 생성
   * @param uid 현재 로그인한 사용자 uid
   * @param pairUid 상대방 uid
   * @returns 생성된 방 또는 존재하는 방의 uid
   */
  async createPersonalChatRoom(uid: string, pairUid: string) {
    const personalChatRoomRef = collection(this.store, this.COLLECTION);

    const existRoomId = await this.findExistPersonalChatRoom(uid, pairUid);

    if (existRoomId) return existRoomId;

    const roomDocRef = await addDoc(personalChatRoomRef, {
      users: [uid, pairUid],
      messages: [{}],
    });

    return roomDocRef.id;
  }

  /**
   * 1:1 채팅방이 이미 존재하는지 찾기
   * @param uid1
   * @param uid2
   * @returns 존재하는 채팅방의 uid , 없을 경우 undefined
   */
  private async findExistPersonalChatRoom(uid1: string, uid2: string) {
    const personalChatRoomRef = collection(this.store, this.COLLECTION);

    const q = query(
      personalChatRoomRef,
      where('users', 'in', [[uid1, uid2]]),
      limit(1),
    );

    const docs = await getDocs(q);

    const rooms: QueryDocumentSnapshot<DocumentData>[] = [];

    docs.forEach(room => {
      rooms.push(room);
    });

    return rooms[0]?.id;
  }
}

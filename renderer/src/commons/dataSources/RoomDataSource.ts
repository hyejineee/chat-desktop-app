import { RoomType } from '@type/room';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from 'firebase/firestore';

export default class RoomDataSource {
  private store: Firestore;
  private PERSONAL_CHAT_ROOM_COLLECTION = 'PersonalChatRooms';
  private OPEN_CHAT_ROOM_COLLECTION = 'OpenChatRooms';

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
    const personalChatRoomRef = collection(
      this.store,
      this.PERSONAL_CHAT_ROOM_COLLECTION,
    );

    const existRoomId = await this.findExistPersonalChatRoom(uid, pairUid);

    if (existRoomId) return existRoomId;

    const userRefs = [uid, pairUid].map(e => doc(this.store, `Users/${e}`));

    const roomDocRef = await addDoc(personalChatRoomRef, {
      users: userRefs,
      messages: [],
    });

    await this.enterUserIntoRoom([uid, pairUid], roomDocRef);

    return roomDocRef.id;
  }

  /**
   * 오픈 채팅방 생성
   * @param uids 초대하는 유저들의 uid
   * @param title 방의 제목
   * @param ownerUid 방을 생성하는 유저의 uid
   * @returns 생성된 방의 uid
   */
  async createOpenChatRoom(uids: string[], title: string, ownerUid: string) {
    const openChatRoomRef = collection(
      this.store,
      this.OPEN_CHAT_ROOM_COLLECTION,
    );

    const userRefs = uids.map(e => doc(this.store, `Users/${e}`));

    const roomDocRef = await addDoc(openChatRoomRef, {
      users: userRefs,
      title,
      owner: ownerUid,
      messages: [],
    });

    await this.enterUserIntoRoom([...uids, ownerUid], roomDocRef);

    return roomDocRef.id;
  }

  /**
   * 현재 로그인한 유저가 속했있는 채팅방 가져오기
   * @param uid 로그인한 유저의 uid
   * @returns 방 리스트
   */
  async fetchAllRoomsByUser(uid: string) {
    const userRef = await getDoc(doc(this.store, 'Users', uid));
    const roomRefs = userRef.data()?.rooms;

    const rooms = await Promise.all(roomRefs.map((ref: any) => getDoc(ref)));

    const result = rooms.map(e => e.data() as RoomType);

    return result;
  }

  async fetchOpenChatRooms() {
    const roomsRef = await getDocs(collection(this.store, 'OpenChatRooms'));

    const rooms: RoomType[] = [];

    roomsRef.forEach(ref => {
      rooms.push(ref.data() as RoomType);
    });

    console.log('room', rooms);
    return rooms;
  }

  /**
   * 사용자의 rooms 필드에 room uid 추가
   * @param uids
   * @param roomRef
   */
  private async enterUserIntoRoom(
    uids: string[],
    roomRef: DocumentReference<DocumentData>,
  ) {
    await Promise.all(
      uids.map(uid =>
        updateDoc(doc(this.store, 'Users', uid), {
          rooms: arrayUnion(roomRef),
        }),
      ),
    );
  }

  /**
   * 1:1 채팅방이 이미 존재하는지 찾기
   * @param uid1
   * @param uid2
   * @returns 존재하는 채팅방의 uid , 없을 경우 undefined
   */
  private async findExistPersonalChatRoom(uid1: string, uid2: string) {
    const personalChatRoomRef = collection(
      this.store,
      this.PERSONAL_CHAT_ROOM_COLLECTION,
    );

    const q = query(
      personalChatRoomRef,
      where('users', 'in', [
        [uid1, uid2],
        [uid2, uid1],
      ]),
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

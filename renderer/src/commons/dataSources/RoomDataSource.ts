import { UserType } from '@type/auth.types';
import { RoomType } from '@type/room.types';
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
import { string } from 'yup/lib/locale';

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

    const roomDocRef = await addDoc(personalChatRoomRef, {
      users: [uid, pairUid],
      messages: [],
      type: 'personal',
    });

    await this.pushUsersIntoRoom([uid, pairUid], roomDocRef);

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

    const roomDocRef = await addDoc(openChatRoomRef, {
      users: uids,
      title,
      owner: ownerUid,
      messages: [],
      type: 'open',
    });

    await this.pushUsersIntoRoom([...uids, ownerUid], roomDocRef);

    return roomDocRef.id;
  }

  /**
   * 현재 로그인한 유저가 속해있는 채팅방 가져오기
   * @param currentUserUid 로그인한 유저의 uid
   * @returns 방 리스트
   */
  async fetchAllRoomsByUser(currentUserUid: string) {
    const currentUserDoc = await getDoc(
      doc(this.store, 'Users', currentUserUid),
    );
    const roomRefs = currentUserDoc.data()?.rooms;

    const roomDocs = await Promise.all(roomRefs.map((ref: any) => getDoc(ref)));

    const result = await Promise.all(
      roomDocs.map(async e => {
        const userIds = e
          .data()
          ?.users?.filter((id: string) => !id.includes(currentUserUid));

        const userDocs = await Promise.all(
          userIds.map((id: string) => getDoc(doc(this.store, 'Users', id))),
        );

        const users = userDocs.map(
          (userDoc: any) => userDoc.data() as UserType,
        );

        return {
          ...e.data(),
          users,
          uid: e.id,
        } as RoomType;
      }),
    );

    console.log(result);

    return result;
  }

  /**
   * 모든 오픈 채팅방 가져오기
   * @returns 오픈 채팅방 리스트
   */
  async fetchOpenChatRooms() {
    const roomsRef = await getDocs(collection(this.store, 'OpenChatRooms'));

    const rooms: RoomType[] = [];

    roomsRef.forEach(ref => {
      rooms.push({ ...ref.data(), uid: ref.id } as RoomType);
    });

    return rooms;
  }

  /**
   * 오픈 채팅방 입장하기
   * @param roomId 오픈 채팅방 아이디
   * @param userUid 입장하는 유저의 아이디
   */
  async enterOpenChatRoom(roomId: string, userUid: string) {
    await Promise.all([
      updateDoc(doc(this.store, 'OpenChatRooms', roomId), {
        users: arrayUnion(userUid),
      }),

      updateDoc(doc(this.store, 'Users', userUid), {
        rooms: arrayUnion(doc(this.store, 'OpenChatRooms', roomId)),
      }),
    ]);
  }

  /**
   * 사용자의 rooms 필드에 room uid 추가
   * @param uids
   * @param roomRef
   */
  private async pushUsersIntoRoom(
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

export interface IRoomRepository {
  createPersonalChatRoom: (pairUid: string) => Promise<string>;
  createOpenChatRoom: (uids: string[], title: string) => Promise<string>;
  fetchAllChatRoomsByUser: () => Promise<RoomType[]>;
  fetchOpenChatRooms: () => Promise<RoomType[]>;
  enterOpenChatRoom: (roomId: string) => Promise<void>;
}

export interface IRoomContext {
  userRooms: RoomType[] | null;
  openRooms: RoomType[] | null;
  createPersonalChatRoom: (pairUid: string) => Promise<string>;
  createOpenChatRoom: (uids: string[], title: string) => Promise<string>;
  fetchAllChatRoomsByUser: () => Promise<void>;
  fetchOpenChatRooms: () => Promise<void>;
  enterOpenChatRoom: (roomId: string) => Promise<void>;
}

export type RoomType = {
  uid: string;
  type: string;
  title?: string;
  users?: UserType[];
  messages?: MessageType[];
};
export interface IRoomRepository {
  createPersonalChatRoom: (pairUid: string) => Promise<string>;
  createOpenChatRoom: (uids: string[], title: string) => Promise<string>;
  fetchAllChatRoomsByUser: () => Promise<RoomType[]>;
  fetchOpenChatRooms: () => Promise<RoomType[]>;
}

export interface IRoomContext {
  userRooms: RoomType[] | null;
  openRooms: RoomType[] | null;
  createPersonalChatRoom: (pairUid: string) => Promise<string>;
  createOpenChatRoom: (uids: string[], title: string) => Promise<string>;
  fetchAllChatRoomsByUser: () => Promise<void>;
  fetchOpenChatRooms: () => Promise<void>;
}

export type RoomType = {
  uid: string;
  title?: string;
  users?: string[];
  messages?: MessageType[];
};
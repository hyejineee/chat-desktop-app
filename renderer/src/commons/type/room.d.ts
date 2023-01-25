export interface IRoomRepository {
  createPersonalChatRoom: (pairUid: string) => Promise<string>;
  createOpenChatRoom: (uids: string[], title: string) => Promise<string>;
}

export interface IRoomContext {
  createPersonalChatRoom: (pairUid: string) => Promise<string>;
  createOpenChatRoom: (uids: string[], title: string) => Promise<string>;
}

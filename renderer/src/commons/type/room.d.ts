export interface IRoomRepository {
  createPersonalChatRoom: (pairUid: string) => Promise<string>;
}

export interface IRoomContext {
  createPersonalChatRoom: (pairUid: string) => Promise<string>;
}

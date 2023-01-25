export interface IMessageRepository {
  subscribeMessage: (
    roomId: string,
    roomType: string,
  ) => Observable<MessageType[]>;
  unsubscribeMessage: () => void;
  sendMessage: (
    message: string,
    roomId: string,
    roomType: string,
  ) => Promise<void>;
}

export interface IMessageContext {
  messages: MessageType[] | null;
  setMessageListener: (roomId: string, roomType: string) => void;
  clearMessageListener: () => void;
  sendMessage: (
    message: string,
    roomId: string,
    roomType: string,
  ) => Promise<void>;
}

export type MessageType = {
  id?: string;
  content: string;
  senderUid: string;
  nickName: string;
  timestamp: Timestamp;
};

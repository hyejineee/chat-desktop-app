import { MessageType } from '@type/message';
import {
  arrayUnion,
  doc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  onSnapshot,
  Unsubscribe,
  updateDoc,
} from 'firebase/firestore';

export default class MessageDataSource {
  private store: Firestore;

  private unsubscribe: Unsubscribe | null = null;

  constructor(store: Firestore) {
    this.store = store;
  }

  fetchMessages(
    roomId: string,
    collection: string,
    updateCallback: (doc: DocumentSnapshot<DocumentData>) => void,
  ) {
    this.unsubscribe = onSnapshot(
      doc(this.store, collection, roomId),
      updateCallback,
    );
  }

  unsubscribeMessage() {
    this.unsubscribe?.();
  }

  async sendMessage(roomId: string, message: MessageType, collection: string) {
    const chatRoomRef = doc(this.store, collection, roomId);

    await updateDoc(chatRoomRef, {
      messages: arrayUnion(message),
    });
  }
}

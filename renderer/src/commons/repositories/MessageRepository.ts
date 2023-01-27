import { BehaviorSubject } from 'rxjs';
import { IMessageRepository, MessageType } from '@type/message.types';
import MessageDataSource from '@dataSources/MessageDataSource';
import { Timestamp } from 'firebase/firestore';
import APP_TYPES from '@type/container.types';
import { inject, injectable } from 'inversify';

import * as authModules from '@type/auth.types';

@injectable()
export default class MessageRepository implements IMessageRepository {
  private messages = new BehaviorSubject<MessageType[]>([]);

  private messageDataSource: MessageDataSource;

  private authRepository: authModules.IAuthRepository;

  constructor(
    @inject(APP_TYPES.MessageDataSource) messageDataSource: MessageDataSource,
    @inject(APP_TYPES.IAuthRepository)
    authRepository: authModules.IAuthRepository,
  ) {
    this.messageDataSource = messageDataSource;
    this.authRepository = authRepository;
  }

  subscribeMessage(roomId: string, roomType: string) {
    this.messageDataSource.fetchMessages(
      roomId,
      roomType === 'personal' ? 'PersonalChatRooms' : 'OpenChatRooms',
      doc => {
        const messageTypeArray = doc
          .data()
          ?.messages.map((e: any) => e as MessageType);

        this.messages.next(messageTypeArray);
      },
    );

    return this.messages;
  }

  unsubscribeMessage() {
    this.messageDataSource.unsubscribeMessage();
  }

  async sendMessage(message: string, roomId: string, roomType: string) {
    const currentUser = await this.authRepository.fetchLoggedInUser();

    if (!currentUser) throw Error('메세지 전송에 실패했습니다.');

    const newMessage: MessageType = {
      id: String(Date.now()),
      content: message,
      senderUid: currentUser.uid,
      nickName: currentUser.nickName,
      timestamp: Timestamp.fromDate(new Date()),
    };

    this.messageDataSource.sendMessage(
      roomId,
      newMessage,
      roomType === 'personal' ? 'PersonalChatRooms' : 'OpenChatRooms',
    );
  }
}

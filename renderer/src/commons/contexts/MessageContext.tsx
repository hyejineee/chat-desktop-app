import {
  IMessageContext,
  IMessageRepository,
  MessageType,
} from '@type/message.types';
import constate from 'constate';
import { useRef, useState } from 'react';
import { Subscription } from 'rxjs';

type UseMessageContextPropsType = {
  messageRepository: IMessageRepository;
};

const useMessageContext: (
  props: UseMessageContextPropsType,
) => IMessageContext = ({ messageRepository }) => {
  const [messages, setMessages] = useState<MessageType[] | null>(null);
  const disposeRef = useRef<Subscription | null>(null);

  const sendMessage = (message: string, roomId: string, type: string) =>
    messageRepository.sendMessage(message, roomId, type);

  const setMessageListener = (roomId: string, roomType: string) => {
    const dispose: Subscription = messageRepository
      .subscribeMessage(roomId, roomType)
      .subscribe({
        next(items: MessageType[]) {
          setMessages(items);
        },
      });

    disposeRef.current = dispose;
  };

  const clearMessageListener = () => {
    disposeRef.current?.unsubscribe();
    messageRepository.unsubscribeMessage();
  };

  return {
    messages,
    sendMessage,
    setMessageListener,
    clearMessageListener,
  };
};

export const [
  MessageProvider,
  useMessages,
  useSendMessage,
  useSetMessageListener,
  useClearMessageListener,
] = constate(
  useMessageContext,
  value => value.messages,
  value => value.sendMessage,
  value => value.setMessageListener,
  value => value.clearMessageListener,
);

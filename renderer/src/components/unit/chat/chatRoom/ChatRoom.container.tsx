import { useShowAlertMessage } from '@contexts/AlertMessageContext';
import { useFetchLoggedInUser } from '@contexts/AuthContext';
import {
  useSetMessageListener,
  useSendMessage,
  useMessages,
} from '@contexts/MessageContext';
import { UserType } from '@type/auth.types';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ChatRoomUI from './ChatRoom.presenter';

export default function ChatRoomContainer() {
  const router = useRouter();

  const loggedInUserRef = useRef<UserType | null>(null);
  const { control, getValues, reset } = useForm();

  const messages = useMessages();
  const sendMessage = useSendMessage();
  const showAlert = useShowAlertMessage();
  const fetchMessages = useSetMessageListener();
  const fetchLoggedInUser = useFetchLoggedInUser();

  useEffect(() => {
    const roomId = String(router.query.chatRoomId || '');
    const type = String(router.query.type || '');

    if (!roomId || !type) return;

    const getUser = async () => {
      const user = await fetchLoggedInUser();
      loggedInUserRef.current = user;
    };

    try {
      fetchMessages(roomId, type);
      getUser();
    } catch (e) {
      if (e instanceof Error) {
        console.log('에러 발생', e.message);
        showAlert('error', e.message);
      }
    }
  }, []);

  const handleClickSendMessage = () => {
    const roomId = String(router.query.chatRoomId || '');
    const type = String(router.query.type || '');
    const message = getValues('message');

    if (!roomId || !message) return;

    try {
      sendMessage(message, roomId, type);
    } catch (e) {
      if (e instanceof Error) {
        showAlert('error', e.message);
      }
    }

    reset({ message: '' });
  };

  return (
    <ChatRoomUI
      title={String(router.query.title)}
      control={control}
      messageList={messages}
      onClickSend={handleClickSendMessage}
      loggedInUser={loggedInUserRef.current}
    />
  );
}

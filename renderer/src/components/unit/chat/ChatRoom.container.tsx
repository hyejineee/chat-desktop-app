import {
  useSetMessageListener,
  useSendMessage,
  useMessages,
} from '@contexts/MessageContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ChatRoomContainer() {
  const router = useRouter();

  const messages = useMessages();
  const sendMessage = useSendMessage();
  const fetchMessages = useSetMessageListener();

  useEffect(() => {
    const roomId = String(router.query.chatRoomId || '');
    const type = String(router.query.type || '');

    if (!roomId || !type) return;
    fetchMessages(roomId, type);
  }, []);

  const handleClickSendMessage = () => {
    const roomId = String(router.query.chatRoomId || '');
    const type = String(router.query.type || '');

    if (!roomId) return;

    sendMessage('hello', roomId, type);
  };

  return (
    <div>
      {(messages || [])?.map(e => (
        <div>{e.content}</div>
      ))}
      <button type='button' onClick={handleClickSendMessage}>
        메세지 보내기
      </button>
    </div>
  );
}

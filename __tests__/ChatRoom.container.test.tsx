import { act, render, screen } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';
import { of } from 'rxjs';
import { anything, mock, when, instance, reset } from 'ts-mockito';
import { AuthProvider } from '../renderer/src/commons/contexts/AuthContext';
import { MessageProvider } from '../renderer/src/commons/contexts/MessageContext';
import {
  IAuthRepository,
  UserType,
} from '../renderer/src/commons/type/auth.types';
import {
  IMessageRepository,
  MessageType,
} from '../renderer/src/commons/type/message.types';
import ChatRoomContainer from '../renderer/src/components/unit/chat/chatRoom/ChatRoom.container';
import { AlertMessageProvider } from '../renderer/src/commons/contexts/AlertMessageContext';
import { MESSAGE_PLACEHOLDER } from '../renderer/src/commons/constants/placeholder';
import userEvent from '@testing-library/user-event';
import AlertMessage from '../renderer/src/components/common/alert/AlertMessage';

mockRouter.useParser(createDynamicRouteParser(['/chat/[chatRoomId]']));
describe('ChatRoomContainer', () => {
  const mockAuthRepository = mock<IAuthRepository>();
  const mockMessageRepository = mock<IMessageRepository>();

  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  const renderComponent = (
    authRepository?: IAuthRepository,
    messageRepository?: IMessageRepository
  ) => {
    when(mockAuthRepository.fetchLoggedInUser()).thenResolve({
      email: 'test@tt.com',
      uid: 'testId',
      nickName: 'test',
      rooms: [''],
    } as UserType);

    const authRepositoryInstance = instance(mockAuthRepository);
    const messagesRepositoryInstance = instance(mockMessageRepository);

    act(() => {
      mockRouter.push('/chat/chatRoomId?title=roomTitle&type=open');
    });

    render(
      <AlertMessageProvider>
        <AlertMessage />
        <AuthProvider
          authRepository={
            authRepository === undefined
              ? authRepositoryInstance
              : authRepository
          }>
          <MessageProvider
            messageRepository={
              messageRepository == undefined
                ? messagesRepositoryInstance
                : messageRepository
            }>
            <ChatRoomContainer />
          </MessageProvider>
        </AuthProvider>
      </AlertMessageProvider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );
  };

  describe('메시지 리스트', () => {
    context('이전에 대화한 내용이 없다면', () => {
      it('빈 화면을 보여준다.', () => {
        when(
          mockMessageRepository.subscribeMessage(anything(), anything())
        ).thenReturn(of([]));

        const messagesRepository = instance(mockMessageRepository);

        renderComponent(undefined, messagesRepository);

        const messageItems = screen.queryAllByRole('listitem');

        expect(messageItems.length).toBe(0);
      });
    });

    context('이전에 대화한 내용이 있다면', () => {
      it('메시지 리스트를 보여준다.', async () => {
        when(
          mockMessageRepository.subscribeMessage(anything(), anything())
        ).thenReturn(
          of([
            {
              content: 'test message',
              senderUid: 'testId',
              nickName: 'test',
              timestamp: '0000.00.00',
            } as MessageType,
          ])
        );

        const messageRepository = instance(mockMessageRepository);

        renderComponent(undefined, messageRepository);

        const messageItems = await screen.findAllByRole('listitem');

        expect(messageItems.length).toBe(1);
      });
    });

    it('메시지를 입력할 수 있다.', async () => {
      renderComponent();

      const messageInput = screen.getByPlaceholderText(MESSAGE_PLACEHOLDER);
      const inputValue = 'this is test message';

      await userEvent.type(messageInput, inputValue);

      expect(messageInput).toHaveDisplayValue(inputValue);
    });

    it('메시지를 전송할 수 있다.', async () => {
      renderComponent();

      const inputValue = 'this is test message';
      const messageInput = screen.getByPlaceholderText(MESSAGE_PLACEHOLDER);
      const sendButton = screen.getByRole('button');

      await userEvent.type(messageInput, inputValue);
      await userEvent.click(sendButton);

      expect(messageInput).toHaveDisplayValue('');
    });

    context('에러 처리', () => {
      const errorMessage = 'errorMessage';

      beforeEach(() => {
        reset(mockMessageRepository);
      });

      context('메시지 리스트를 가져올 때', () => {
        it('에러가 발생하면 에러 메시지를 보여준다.', async () => {
          when(
            mockMessageRepository.subscribeMessage(anything(), anything())
          ).thenThrow(new Error(errorMessage));

          const messageRepository = instance(mockMessageRepository);

          renderComponent(undefined, messageRepository);

          expect(await screen.findByText(errorMessage)).toBeInTheDocument();
        });
      });

      context('메시지를 보낼 때', () => {
        it('에러가 발생하면 에러 메시지를 보여준다.', async () => {
          when(
            mockMessageRepository.sendMessage(
              anything(),
              anything(),
              anything()
            )
          ).thenThrow(new Error(errorMessage));

          const messageRepository = instance(mockMessageRepository);

          renderComponent(undefined, messageRepository);

          const inputValue = 'this is test message';
          const messageInput = screen.getByPlaceholderText(MESSAGE_PLACEHOLDER);
          const sendButton = screen.getByRole('button');

          await userEvent.type(messageInput, inputValue);
          await userEvent.click(sendButton);

          expect(await screen.findByText(errorMessage)).toBeInTheDocument();
        });
      });
    });
  });
});

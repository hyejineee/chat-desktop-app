import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import { mock } from 'ts-mockito';
import { CREATE_OPEN_CHAT_PAGE } from '../renderer/src/commons/constants/paths';
import { RoomProvider } from '../renderer/src/commons/contexts/RoomContext';
import { UserType } from '../renderer/src/commons/type/auth.types';
import { MessageType } from '../renderer/src/commons/type/message.types';
import { IRoomRepository, RoomType } from '../renderer/src/commons/type/room.types';

import ChatListContainer from '../renderer/src/components/unit/chat/chatRoomList/ChatList.container';

describe('ChatRoomListContainer', () => {
  const mockRoomRepository = mock<IRoomRepository>();

  const defaultUsers = Array(3)
    .fill(0)
    .map((e, i) => ({ email: 'email', uid: String(i), nickName: 'test', rooms: [''] } as UserType));

  const defaultMessages = Array(3)
    .fill(0)
    .map((e, i) => ({ id: String(i), content: 'message', senderUid: String(i), nickName: 'test', timestamp: '2023-01-12' } as MessageType));

  const defaultRoomList = Array(2)
    .fill(0)
    .map(
      (e, i) =>
        ({
          uid: String(i),
          type: i % 2 === 0 ? 'personal' : 'open',
          title: i % 2 === 0 ? undefined : 'openTitle',
          users: defaultUsers,
          messages: defaultMessages,
        } as RoomType)
    );

  const defaultTitle = 'test';
  const subTitle = 'test';
  const handleClickChatRoomItem = jest.fn();

  const renderComponent = (roomRepository: IRoomRepository = mockRoomRepository, roomList: RoomType[] | null = defaultRoomList, title: string = defaultTitle) => {
    render(
      <RoomProvider roomRepository={roomRepository}>
        <ChatListContainer roomList={roomList} title={title} subTitle={subTitle} onClickChatRoomItem={handleClickChatRoomItem} />
      </RoomProvider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );
  };

  context('채팅방 리스트', () => {
    context('참여한 채팅방이 있다면', () => {
      it('내가 참여한 채팅 목록을 볼 수 있다.', () => {
        renderComponent();

        expect(screen.getAllByText('openTitle').length).toBeGreaterThan(0);
      });
    });

    context('참여한 채팅방이 없다면', () => {
      it('채팅방 리스트가 비어있다.', () => {
        renderComponent(mockRoomRepository, null);

        expect(screen.queryAllByText('openTitle').length).toBe(0);
      });
    });
  });

  context('채팅방을 클릭하면', () => {
    it('아이템 클릭 이벤트 핸들러 메소드가 호출된다.', async () => {
      renderComponent();

      const chatRoomItem = screen.getAllByText('openTitle')[0];

      await userEvent.click(chatRoomItem);

      expect(handleClickChatRoomItem).toHaveBeenCalled();
    });
  });

  context('오픈 채팅방 생성 버튼을 클릭하면', () => {
    it('오픈 채팅방 생성 화면으로 이동한다.', async () => {
      renderComponent(mockRoomRepository, defaultRoomList, '오픈 채팅 리스트');

      const plusIconButton = screen.getByLabelText('plus');

      await userEvent.click(plusIconButton);

      expect(mockRouter.asPath).toBe(CREATE_OPEN_CHAT_PAGE);
    });
  });
});

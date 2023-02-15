import { render, screen } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import mockRouter from 'next-router-mock';
import { anything, instance, mock, when } from 'ts-mockito';
import { AlertMessageProvider } from '../renderer/src/commons/contexts/AlertMessageContext';
import { RoomProvider } from '../renderer/src/commons/contexts/RoomContext';
import { UserProvider } from '../renderer/src/commons/contexts/UserContext';
import { UserType } from '../renderer/src/commons/type/auth.types';
import { IRoomRepository } from '../renderer/src/commons/type/room.types';
import { IUserRepository } from '../renderer/src/commons/type/user.types';
import UserListContainer from '../renderer/src/components/unit/users/UserList.container';
import userEvent from '@testing-library/user-event';
import AlertMessage from '../renderer/src/components/common/alert/AlertMessage';

describe('UserListContainer', () => {
  const mockUserRepository = mock<IUserRepository>();
  const mockRoomRepository = mock<IRoomRepository>();

  const users = [
    {
      email: 'aa@aa.com',
      uid: 'testId',
      nickName: 'testNickName',
      rooms: ['testRoom1', 'testRoom2'],
    } as UserType,

    {
      email: 'bb@bb.com',
      uid: 'testId2',
      nickName: 'testNickName2',
      rooms: ['testRoom1', 'testRoom2'],
    } as UserType,
  ];

  const renderComponent = (
    userRepository: IUserRepository = mockUserRepository,
    roomRepository: IRoomRepository = mockRoomRepository
  ) => {
    render(
      <AlertMessageProvider>
        <AlertMessage />
        <UserProvider userRepository={userRepository}>
          <RoomProvider roomRepository={roomRepository}>
            <UserListContainer />
          </RoomProvider>
        </UserProvider>
      </AlertMessageProvider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );
  };

  it('가입된 모든 사용자를 보여준다.', () => {
    when(mockUserRepository.fetchAllUser()).thenResolve(users);
    const userRepository = instance(mockUserRepository);

    renderComponent(userRepository);

    users.forEach(async (user) => {
      expect(await screen.findByText(user.nickName)).toBeInTheDocument();
    });
  });

  it('개인 채팅방을 생성한다.', async () => {
    const roomId = 'testRoomId';
    when(mockUserRepository.fetchAllUser()).thenResolve(users);

    when(mockRoomRepository.createPersonalChatRoom(anything())).thenResolve(
      roomId
    );

    const userRepository = instance(mockUserRepository);
    const roomRepository = instance(mockRoomRepository);

    renderComponent(userRepository, roomRepository);

    const personalChatButton = await screen.findAllByRole('button');
    await userEvent.click(personalChatButton[0]);

    expect(mockRouter.asPath).toBe(
      `/chat/${roomId}?type=personal&title=${users[0].nickName}`
    );
  });

  describe('에러 처리', () => {
    context('유저 리스트를 가져올 때 에러가 발생하면', () => {
      it('에러메시지를 출력한다.', async () => {
        const errorMessage = 'fetch user list error';

        when(mockUserRepository.fetchAllUser()).thenThrow(
          new Error(errorMessage)
        );

        const userRepository = instance(mockUserRepository);

        renderComponent(userRepository);

        expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      });
    });

    context('개인 채팅방 생성 시 에러가 발생하면', () => {
      it('에러메시지를 출력한다.', async () => {
        const errorMessage = 'create room error';

        when(mockUserRepository.fetchAllUser()).thenResolve(users);
        when(mockRoomRepository.createPersonalChatRoom(anything())).thenThrow(
          new Error(errorMessage)
        );

        const userRepository = instance(mockUserRepository);
        const roomRepository = instance(mockRoomRepository);

        renderComponent(userRepository, roomRepository);

        const personalChatButton = await screen.findAllByRole('button');
        await userEvent.click(personalChatButton[0]);

        expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      });
    });
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import mockRouter from 'next-router-mock';
import { anything, instance, mock, reset, when } from 'ts-mockito';
import { TITLE_PLACEHOLDER } from '../renderer/src/commons/constants/placeholder';
import { AlertMessageProvider } from '../renderer/src/commons/contexts/AlertMessageContext';
import { RoomProvider } from '../renderer/src/commons/contexts/RoomContext';
import { UserProvider } from '../renderer/src/commons/contexts/UserContext';
import { UserType } from '../renderer/src/commons/type/auth.types';
import { IRoomRepository } from '../renderer/src/commons/type/room.types';
import { IUserRepository } from '../renderer/src/commons/type/user.types';
import AlertMessage from '../renderer/src/components/common/alert/AlertMessage';
import CreateOpenChatContainer from '../renderer/src/components/unit/chat/create/CreateOpenChat.container';
import { CREATE_OPEN_CHAT_PAGE } from '../renderer/src/commons/constants/paths';

describe('CreateOpenChatContainer', () => {
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
            <CreateOpenChatContainer />
          </RoomProvider>
        </UserProvider>
      </AlertMessageProvider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );
  };

  it('???????????? ????????? ?????? ???????????? ????????????.', () => {
    when(mockUserRepository.fetchAllUser()).thenResolve(users);

    const userRepository = instance(mockUserRepository);

    renderComponent(userRepository);

    users.forEach(async (user) => {
      expect(await screen.findByText(user.nickName)).toBeInTheDocument();
    });
  });

  context('?????? ????????? ????????? ??????', () => {
    context('?????? ????????? ????????? ????????? ???????????? ?????????', () => {
      it('?????? ???????????? ?????? ????????? ????????????.', async () => {
        when(mockUserRepository.fetchAllUser()).thenResolve(users);
        const userRepository = instance(mockUserRepository);

        renderComponent(userRepository);

        const userItem = await screen.findByText(users[0].nickName);
        await userEvent.click(userItem);
        await userEvent.click(userItem);

        expect(screen.getAllByText(users[0].nickName).length).toBe(1);
      });
    });

    context('?????? ????????? ????????? ????????? ???????????? ?????????', () => {
      it('?????? ????????? ?????? ????????? ????????????.', async () => {
        when(mockUserRepository.fetchAllUser()).thenResolve(users);
        const userRepository = instance(mockUserRepository);

        renderComponent(userRepository);

        const userItem = await screen.findByText(users[0].nickName);
        await userEvent.click(userItem);

        expect(screen.getAllByText(users[0].nickName).length).toBeGreaterThan(
          1
        );
      });
    });
  });

  describe('????????? ??????', () => {
    beforeEach(() => {
      reset(mockUserRepository);
      mockRouter.push(CREATE_OPEN_CHAT_PAGE);
    });

    context('????????? ????????? ??????, ???????????? ?????????', () => {
      it('???????????? ????????????.', async () => {
        when(mockUserRepository.fetchAllUser()).thenResolve(users);
        when(
          mockRoomRepository.createOpenChatRoom(anything(), anything())
        ).thenResolve('roomId');

        const roomRepository = instance(mockRoomRepository);
        const userRepository = instance(mockUserRepository);

        renderComponent(userRepository, roomRepository);

        const userItem = await screen.findByText(users[0].nickName);
        const titleInput = screen.getByPlaceholderText(TITLE_PLACEHOLDER);
        const doneButton = screen.getByText('??????');
        const titleValue = 'title';

        await userEvent.click(userItem);
        await userEvent.type(titleInput, titleValue);
        await userEvent.click(doneButton);

        expect(mockRouter.asPath).toBe('/chat/roomId?type=open&title=title');
      });
    });

    context('????????? ????????? ??????, ???????????? ?????????', () => {
      it('???????????? ???????????? ?????????', async () => {
        when(mockUserRepository.fetchAllUser()).thenResolve(users);
        when(
          mockRoomRepository.createOpenChatRoom(anything(), anything())
        ).thenResolve('roomId');

        const roomRepository = instance(mockRoomRepository);
        const userRepository = instance(mockUserRepository);

        renderComponent(userRepository, roomRepository);

        const doneButton = screen.getByText('??????');

        await userEvent.click(doneButton);

        expect(mockRouter.asPath).toBe(CREATE_OPEN_CHAT_PAGE);
      });
    });
  });

  context('?????? ??????', () => {
    context('?????? ???????????? ????????? ??? ????????? ????????????', () => {
      it('?????? ???????????? ????????????.', async () => {
        const errorMessage = 'errorMessage';

        when(mockUserRepository.fetchAllUser()).thenThrow(
          new Error(errorMessage)
        );
        const userRepository = instance(mockUserRepository);

        renderComponent(userRepository);

        expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      });
    });

    context('?????? ????????? ?????? ??? ????????? ????????????', () => {
      it('?????? ???????????? ????????????.', async () => {
        const errorMessage = 'createOpenRoomError';

        when(mockUserRepository.fetchAllUser()).thenResolve(users);
        when(
          mockRoomRepository.createOpenChatRoom(anything(), anything())
        ).thenThrow(new Error(errorMessage));

        const roomRepository = instance(mockRoomRepository);
        const userRepository = instance(mockUserRepository);

        renderComponent(userRepository, roomRepository);

        const userItem = await screen.findByText(users[0].nickName);
        const titleInput = screen.getByPlaceholderText(TITLE_PLACEHOLDER);
        const doneButton = screen.getByText('??????');
        const titleValue = 'title';

        await userEvent.click(userItem);
        await userEvent.type(titleInput, titleValue);
        await userEvent.click(doneButton);

        expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      });
    });
  });
});

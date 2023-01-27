import AuthDataSource from '@dataSources/AuthDataSource';
import MessageDataSource from '@dataSources/MessageDataSource';
import RoomDataSource from '@dataSources/RoomDataSource';
import UserDataSource from '@dataSources/UserDataSource';
import AuthRepository from '@repositories/AuthRepository';
import { Container } from 'inversify';
import UserRepository from '@repositories/UserRepository';
import RoomRepository from '@repositories/RoomRepository';
import MessageRepository from '@repositories/MessageRepository';
import { IMessageRepository } from './message.types';
import { IUserRepository } from './user.types';
import { IRoomRepository } from './room.types';
import { IAuthRepository } from './auth.types';
import { auth, db } from '../settings/firebaseConfig';
import APP_TYPES from './container.types';

const appContainer = new Container();

appContainer
  .bind(APP_TYPES.AuthDataSource)
  .toConstantValue(new AuthDataSource(auth, db));

appContainer
  .bind(APP_TYPES.UserDataSource)
  .toConstantValue(new UserDataSource(db));
appContainer
  .bind(APP_TYPES.RoomDataSource)
  .toConstantValue(new RoomDataSource(db));
appContainer
  .bind(APP_TYPES.MessageDataSource)
  .toConstantValue(new MessageDataSource(db));

appContainer
  .bind<IAuthRepository>(APP_TYPES.IAuthRepository)
  .to(AuthRepository);

appContainer
  .bind<IUserRepository>(APP_TYPES.IUserRepository)
  .to(UserRepository);

appContainer
  .bind<IRoomRepository>(APP_TYPES.IRoomRepository)
  .to(RoomRepository);

appContainer
  .bind<IMessageRepository>(APP_TYPES.IMessageRepository)
  .to(MessageRepository);

export default appContainer;

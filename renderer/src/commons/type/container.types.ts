const APP_TYPES = {
  IAuthRepository: Symbol.for('IAuthRepository'),
  IMessageRepository: Symbol.for('IMessageRepository'),
  IRoomRepository: Symbol.for('IRoomRepository'),
  IUserRepository: Symbol.for('IUserRepository'),
  AuthDataSource: Symbol.for('AuthDataSource'),
  UserDataSource: Symbol.for('UserDataSource'),
  RoomDataSource: Symbol.for('RoomDataSource'),
  MessageDataSource: Symbol.for('MessageDataSource'),
};

export default APP_TYPES;

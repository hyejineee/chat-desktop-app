/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import 'reflect-metadata';
import appContainer from '@type/container';

import 'antd/dist/antd.css';
import Layout from 'src/components/common/layout/Layout';
import { AuthProvider } from '@contexts/AuthContext';
import AuthDataSource from '@dataSources/AuthDataSource';
import { auth, db } from 'src/commons/settings/firebaseConfig';
import { UserProvider } from '@contexts/UserContext';
import UserRepository from '@repositories/UserRepository';
import UserDataSource from '@dataSources/UserDataSource';
import { RoomProvider } from '@contexts/RoomContext';
import RoomRepository from '@repositories/RoomRepository';
import RoomDataSource from '@dataSources/RoomDataSource';
import { MessageProvider } from '@contexts/MessageContext';
import MessageDataSource from '@dataSources/MessageDataSource';
import MessageRepository from '@repositories/MessageRepository';
import { Global } from '@emotion/react';
import resetStyles from 'src/components/common/styles/reset.styles';
import { AlertMessageProvider } from '@contexts/AlertMessageContext';
import AlertMessage from 'src/components/common/alert/AlertMessage';
import { IAuthRepository } from '@type/auth.types';
import APP_TYPES from '@type/container.types';
import { IMessageRepository } from '@type/message.types';
import { IUserRepository } from '@type/user.types';
import { IRoomRepository } from '@type/room.types';

function MyApp({ Component, pageProps }: AppProps) {
  const authRepository = appContainer.get<IAuthRepository>(
    APP_TYPES.IAuthRepository,
  );

  const messageRepository = appContainer.get<IMessageRepository>(
    APP_TYPES.IMessageRepository,
  );

  const userRepository = appContainer.get<IUserRepository>(
    APP_TYPES.IUserRepository,
  );

  const roomRepository = appContainer.get<IRoomRepository>(
    APP_TYPES.IRoomRepository,
  );

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <AlertMessageProvider>
        <AuthProvider authRepository={authRepository}>
          <UserProvider userRepository={userRepository}>
            <RoomProvider roomRepository={roomRepository}>
              <MessageProvider messageRepository={messageRepository}>
                <AlertMessage />
                <Global styles={resetStyles} />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </MessageProvider>
            </RoomProvider>
          </UserProvider>
        </AuthProvider>
      </AlertMessageProvider>
    </>
  );
}

export default MyApp;

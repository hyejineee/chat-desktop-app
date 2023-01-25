/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import 'antd/dist/antd.css';
import Layout from 'src/components/common/layout/Layout';
import { AuthProvider } from '@contexts/AuthContext';
import AuthRepository from '@repositories/AuthRepository';
import AuthDataSource from '@dataSources/AuthDataSource';
import { auth, db } from 'src/commons/settings/firebaseConfig';
import { UserProvider } from '@contexts/UserContext';
import UserRepository from '@repositories/UserRepository';
import UserDataSource from '@dataSources/UserDataSource';
import { RoomProvider } from '@contexts/RoomContext';
import RoomRepository from '@repositories/RoomRepository';
import RoomDataSource from '@dataSources/RoomDataSource';

const authDataSource = new AuthDataSource(auth, db);
const userDataSource = new UserDataSource(db);
const roomDataSource = new RoomDataSource(db);
const authRepository = new AuthRepository(authDataSource);
const userRepository = new UserRepository(userDataSource, authRepository);
const roomRepository = new RoomRepository(roomDataSource, authRepository);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <AuthProvider authRepository={authRepository}>
        <UserProvider userRepository={userRepository}>
          <RoomProvider roomRepository={roomRepository}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RoomProvider>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;

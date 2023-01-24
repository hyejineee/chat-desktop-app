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

function MyApp({ Component, pageProps }: AppProps) {
  const authDataSource = new AuthDataSource(auth, db);
  const authRepository = new AuthRepository(authDataSource);
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <AuthProvider authRepository={authRepository}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default MyApp;

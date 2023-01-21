import React from 'react';
import Head from 'next/head';

import { Layout, Result } from 'antd';

const { Header, Content } = Layout;

function Next() {
  return (
    <>
      <Head>
        <title>Next - Nextron (with-typescript-ant-design)</title>
      </Head>

      <Content style={{ padding: 48 }}>
        <Result status='success' title='Nextron' subTitle='with Ant Design' />
      </Content>
    </>
  );
}

export default Next;

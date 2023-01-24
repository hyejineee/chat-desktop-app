import Head from 'next/head';

import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/commons/settings/firebaseConfig';
import withAuth from 'src/commons/utils/withAuth';

function Home() {
  const handleClick = async () => {
    const data = await getDocs(collection(db, 'Users'));
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>여기가 헤드</title>
      </Head>
      <button type='button' onClick={handleClick}>
        파이어 베이스 연결 테스트
      </button>
    </>
  );
}

export default withAuth(Home);

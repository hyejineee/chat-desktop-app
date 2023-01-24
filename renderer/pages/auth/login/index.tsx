import Head from 'next/head';
import LoginContainer from 'src/components/unit/auth/login/Login.container';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>login</title>
      </Head>
      <LoginContainer />
    </>
  );
}

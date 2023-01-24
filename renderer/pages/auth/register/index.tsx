import Head from 'next/head';
import RegisterUserContainer from 'src/components/unit/auth/register/RegisterUser.container';

export default function RegisterUserPage() {
  return (
    <>
      <Head>
        <title>register</title>
      </Head>
      <RegisterUserContainer />
    </>
  );
}

/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LOGIN_PAGE } from '@constants/paths';
import { useCheckLoggedIn } from '@contexts/AuthContext';

const withAuth = (Component: any) => (pageProps: AppProps) => {
  console.log('with auth');

  const router = useRouter();
  const checkLoggedIn = useCheckLoggedIn();

  useEffect(() => {
    checkLoggedIn().then((loggedIn: boolean) => {
      if (!router.pathname.includes(LOGIN_PAGE) && !loggedIn) {
        router.replace(LOGIN_PAGE);
      }
    });
  });

  return <Component {...pageProps} />;
};

export default withAuth;

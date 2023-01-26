import { LOGIN_PAGE } from '@constants/paths';
import { useLogout } from '@contexts/AuthContext';
import { Button } from 'antd';
import { useRouter } from 'next/router';

export default function SettingContainer() {
  const router = useRouter();
  const logout = useLogout();

  const handleClickLogout = () => {
    logout();
    router.replace(LOGIN_PAGE);
  };
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button type='primary' shape='round' onClick={handleClickLogout}>
        로그아웃
      </Button>
    </div>
  );
}

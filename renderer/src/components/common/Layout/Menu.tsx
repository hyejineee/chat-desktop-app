import type { MenuProps } from 'antd';
import { Menu as AntdMenu } from 'antd';
import {
  UserOutlined,
  WechatOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { CHAT_PAGE, SETTING_PAGE, USERS_PAGE } from '@constants/paths';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('유저 목록', USERS_PAGE, <UserOutlined />),
  getItem('채팅방 목록', CHAT_PAGE, <WechatOutlined />),
  getItem('설정', SETTING_PAGE, <SettingOutlined />),
];

export default function Menu() {
  const router = useRouter();

  const handleClickMenuItem: MenuProps['onClick'] = ({ key }) => {
    router.push(key);
  };

  return (
    <AntdMenu
      mode='inline'
      inlineCollapsed
      items={items}
      onClick={handleClickMenuItem}
      style={{ height: '100%' }}
    />
  );
}

import type { MenuProps } from 'antd';
import { Menu as AntdMenu } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  MessageOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import {
  CHAT_PAGE,
  OPEN_CHAT_PAGE,
  SETTING_PAGE,
  USERS_PAGE,
} from '@constants/paths';

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
  getItem('유저 리스트', USERS_PAGE, <UserOutlined />),
  getItem('나의 채팅방 리스트', CHAT_PAGE, <MessageOutlined />),
  getItem('오픈 채팅방 리스트', OPEN_CHAT_PAGE, <WechatOutlined />),
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
      defaultSelectedKeys={[router.pathname]}
      inlineCollapsed
      items={items}
      onClick={handleClickMenuItem}
      style={{ height: '100%' }}
    />
  );
}

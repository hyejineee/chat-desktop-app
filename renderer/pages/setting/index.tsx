import withAuth from '@utils/withAuth';
import SettingContainer from 'src/components/unit/setting/Setting.container';

function SettingPage() {
  return <SettingContainer />;
}

export default withAuth(SettingPage);

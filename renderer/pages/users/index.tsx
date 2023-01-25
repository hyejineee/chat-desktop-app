import withAuth from '@utils/withAuth';
import UserListContainer from 'src/components/unit/users/UserList.container';

function UsersPage() {
  return <UserListContainer />;
}

export default withAuth(UsersPage);

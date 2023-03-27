import Authorization from '@components/Common/Authorization';
import UserEditPage from 'components/User/UserEditPage';

export default function UserEdit() {
  return (
    <Authorization>
      <UserEditPage />
    </Authorization>
  );
}

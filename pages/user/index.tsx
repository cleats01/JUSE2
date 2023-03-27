import Authorization from '@components/Common/Authorization';
import UserPage from 'components/User/UserPage';

export default function User() {
  return (
    <Authorization>
      <UserPage />
    </Authorization>
  );
}

import NewPage from 'components/New/NewPage';
import Authorization from '@components/Common/Authorization';

export default function New() {
  return (
    <Authorization>
      <NewPage />
    </Authorization>
  );
}

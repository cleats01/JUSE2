import styled from 'styled-components';
import { getUserById } from 'utils/axios';
import { DehydratedState, useQuery } from 'react-query';
import { useRouter } from 'next/router';

import NavbarTextOnly from 'components/Common/NavbarTextOnly';
import OtherUserBottomController from 'components/User/OtherUserBottomController';
import UserInfo from 'components/User/UserInfo';

interface IProps {
  dehydratedState: DehydratedState;
}

export default function OtherUserPage(props: IProps) {
  const router = useRouter();

  const { data: userData } = useQuery('user', () =>
    getUserById(router.query.userId as string)
  );

  const user = userData;

  return user ? (
    <UserInfoLayout>
      <NavbarTextOnly centerText='유저 정보' back={true} />
      <UserInfo user={user} />
      <OtherUserBottomController />
    </UserInfoLayout>
  ) : (
    <div>loading...</div>
  );
}

const UserInfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

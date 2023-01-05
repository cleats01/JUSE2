import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { User } from '@prisma/client';
import { getMyLists, getUserById, getUsersByIds } from 'utils/axios';
import { useRouter } from 'next/router';

import { Button } from '@mui/material';
import NavbarTextOnly from 'components/Common/NavbarTextOnly';
import UserInfo from 'components/User/UserInfo';
import MyLists from 'components/User/MyLists';
import TabBar from 'components/Common/TabBar';

export default function UserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [boardsData, setBoardsData] = useState<myBoardsData>();
  const [likeListData, setLikeListData] = useState<User[]>();

  useEffect(() => {
    const userInfoData = async () => {
      const user: User = await getUserById(session?.user.id).then((data) => {
        setUser(data);
        return data;
      });
      await getMyLists(session?.user.id).then((data) => {
        setBoardsData(data);
      });
      if (user.likeList.length) {
        await getUsersByIds(user.likeList).then((data) => {
          setLikeListData(data);
        });
      }
    };
    if (status === 'authenticated') {
      userInfoData();
    }
  }, [status]);

  const signOutHandler = () => {
    signOut({ callbackUrl: '/login' });
  };

  const myListsProps = {
    boardsData,
    likeListData,
  };

  return user ? (
    <UserInfoLayout>
      <NavbarTextOnly centerText='내 정보' />
      <UserInfo user={user} />
      <ButtonWrapper>
        <Button
          onClick={() => {
            router.push('/user/edit');
          }}
          variant='outlined'
          size='small'>
          정보 수정
        </Button>
        <Button
          variant='contained'
          disableElevation
          size='small'
          style={{ color: '#fff' }}
          onClick={signOutHandler}>
          로그아웃
        </Button>
      </ButtonWrapper>
      <MyLists {...myListsProps} />
      <TabBar />
    </UserInfoLayout>
  ) : (
    <div>loading...</div>
  );
}

const UserInfoLayout = styled.div`
  padding: 70px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  padding-top: 20px;
  > button {
    flex-grow: 1;
  }
`;

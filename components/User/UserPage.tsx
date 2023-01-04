import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';
import { getMyLists, getUserById, getUsersByIds } from 'utils/axios';

import NavbarTextOnly from 'components/NavbarTextOnly';
import UserInfo from 'components/User/UserInfo';
import MyLists from 'components/User/MyLists';
import TabBar from 'components/TabBar';

export default function UserPage() {
  const { data: session, status } = useSession();
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

  const myListsProps = {
    boardsData,
    likeListData,
  };

  return user ? (
    <UserInfoLayout>
      <NavbarTextOnly centerText='내 정보' />
      <UserInfo user={user} />
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

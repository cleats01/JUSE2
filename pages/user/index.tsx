import React, { useEffect, useState } from 'react';
import TabBar from '../../components/TabBar';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import NavbarTextOnly from '../../components/NavbarTextOnly';
import styled from 'styled-components';
import axios from 'axios';
import { StackBubble } from '../add';
import { User } from '@prisma/client';
import HeartFilledIcon from '../../public/icons/heart-filled.svg';
import AngleRightIcon from '../../public/icons/angle-small-right.svg';
import { Button } from '@mui/material';

export default function UserPage() {
  const { data: session, status } = useSession();
  const signOutHandler = () => {
    signOut({ callbackUrl: '/login' });
  };
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const userInfoData = async () =>
      await axios
        .get(`/api/users?id=${session?.user.id}`)
        .then((res) => setUser(res.data));
    if (status === 'authenticated') {
      userInfoData();
    }
  }, [status]);

  return user ? (
    <UserInfoLayout>
      <NavbarTextOnly centerText='내 정보' />
      <InfoContainer>
        <ProfileWrapper>
          <img src=''></img>
          <span>{user.nickname}</span>
          <LikeWrapper>
            <HeartFilledIcon fill={'tomato'} width={25} height={25} />
            <span>{user.like}</span>
          </LikeWrapper>
        </ProfileWrapper>
        <TechStackContainer>
          {user.userTechStack.map((stack) => (
            <StackBubble key={stack} src={`/icons/stacks/${stack}.png`} />
          ))}
        </TechStackContainer>
        <ButtonWrapper>
          <Button variant='outlined' size='small'>
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
      </InfoContainer>
      <ListsContainer>
        <ListItem>
          <h4>나의 모임</h4>
          <AngleRightIcon width={30} height={30} />
        </ListItem>
        <ListItem>
          <h4>지원한 모임</h4>
          <AngleRightIcon width={30} height={30} />
        </ListItem>
        <ListItem>
          <h4>북마크한 모임</h4>
          <AngleRightIcon width={30} height={30} />
        </ListItem>
        <ListItem>
          <h4>좋아요한 사용자</h4>
          <AngleRightIcon width={30} height={30} />
        </ListItem>
        <ListItem>
          <h4>알림</h4>
        </ListItem>
      </ListsContainer>
      <TabBar />
    </UserInfoLayout>
  ) : (
    <div>loading...</div>
  );
}

const UserInfoLayout = styled.div`
  padding: 70px 0;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 16px;
`;

const TechStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  > img {
    width: 35px;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  > img {
    width: 50px;
    height: 50px;
    background-color: grey;
    border-radius: 50px;
  }
  > span {
    font-weight: 700;
  }
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  margin-right: 10px;
  > span {
    font-size: 18px;
    width: 22px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  > button {
    flex-grow: 1;
  }
`;

const ListsContainer = styled.ul`
  margin-top: 10px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
  > h4 {
    font-weight: 700;
    font-size: 18px;
  }
`;

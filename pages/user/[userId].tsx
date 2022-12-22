import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import NavbarTextOnly from '../../components/NavbarTextOnly';
import styled from 'styled-components';
import axios from 'axios';
import { StackBubble } from '../add';
import { User } from '@prisma/client';
import HeartFilledIcon from '../../public/icons/heart-filled.svg';
import HeartIcon from '../../public/icons/heart.svg';
import { boardData } from '..';
import BottomController from '../../components/BottomController';
import { Button } from '@mui/material';
import { GetServerSidePropsContext } from 'next';

interface propsType extends User {
  isLiked: boolean;
}

export default function UserPage(props: propsType) {
  const { data: session, status } = useSession();

  const user = props;

  return user ? (
    <UserInfoLayout>
      <NavbarTextOnly centerText='유저 정보' back={true} />
      <InfoContainer>
        <ProfileWrapper>
          <img src={user.image} alt='user-image' />
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
      </InfoContainer>
      <BottomController>
        {user.isLiked ? (
          <HeartFilledIcon
            width={25}
            height={25}
            fill='tomato'
            onClick={() => {
              axios.post(`/api/likes?userId=${user.id}`);
            }}
          />
        ) : (
          <HeartIcon
            width={25}
            height={25}
            onClick={() => {
              if (!session) {
                alert('로그인이 필요한 기능입니다.');
              } else {
                axios.post(`/api/likes?userId=${user.id}`);
              }
            }}
          />
        )}
        <Button
          size='large'
          sx={{ color: '#fff' }}
          variant='contained'
          disableElevation>
          채팅하기
        </Button>
      </BottomController>
    </UserInfoLayout>
  ) : (
    <div>loading...</div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let { cookie } = context.req.headers;
  cookie = cookie ? cookie : '';
  axios.defaults.headers.Cookie = cookie;
  const { userId } = context.query;
  let data;
  let isLiked: boolean = false;
  try {
    data = await axios
      .get(`${process.env.BASE_URL}/api/users?id=${userId}`)
      .then((res) => res.data);
    isLiked = await axios
      .get(`${process.env.BASE_URL}/api/likes?userId=${userId}`)
      .then((res) => res.data.isLiked);
  } catch (error) {
    console.error('getServerSideProps user/:userId >> ', error);
  } finally {
    axios.defaults.headers.Cookie = '';
  }

  return { props: { ...data, isLiked } };
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

const DrawerHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey1};
  background-color: #fff;
  z-index: 2;
  > span {
    margin: auto;
  }
`;

const DrawerLayout = styled.div`
  padding: 55px 16px;
  width: 100vw;
  max-width: 480px;
`;

const BoardContainer = styled.div`
  margin-top: 10px;
`;

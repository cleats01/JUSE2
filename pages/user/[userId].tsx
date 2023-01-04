import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import NavbarTextOnly from '../../components/NavbarTextOnly';
import styled from 'styled-components';
import axios from 'axios';
import { StackBubble } from '../add';
import { User } from '@prisma/client';
import HeartFilledIcon from '../../public/icons/heart-filled.svg';
import HeartIcon from '../../public/icons/heart.svg';
import BottomController from '../../components/BottomController';
import { Button } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import {
  getIsLiked,
  getUserById,
  postChattingRoom,
  postLikes,
} from '../../utils/axios';
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useRouter } from 'next/router';

interface propsType {
  dehydratedState: DehydratedState;
}

export default function UserPage(props: propsType) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: userData } = useQuery('user', () =>
    getUserById(router.query.userId as string)
  );
  const { data: isLiked } = useQuery('isLiked', () =>
    getIsLiked(router.query.userId as string)
  );

  const user = { ...userData, isLiked };

  const postLikeMutation = useMutation(() => postLikes(user.id), {
    onMutate: async () => {
      await queryClient.cancelQueries('user');
      await queryClient.cancelQueries('isLiked');

      const previousUser = queryClient.getQueryData<User>('user');
      const previousIsLiked = queryClient.getQueryData<boolean>('isLiked');

      if (previousUser && previousIsLiked !== undefined) {
        queryClient.setQueryData<User>('user', {
          ...previousUser,
          like: previousIsLiked ? previousUser.like - 1 : previousUser.like + 1,
        });
        queryClient.setQueryData<boolean>('isLiked', !previousIsLiked);
      }

      return { previousUser, previousIsLiked };
    },
    onError: (err, variables, context) => {
      if (context?.previousUser && context?.previousIsLiked) {
        queryClient.setQueryData<User>('todos', context.previousUser);
        queryClient.setQueryData<boolean>('isLiked', context.previousIsLiked);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      queryClient.invalidateQueries('isLiked');
    },
  });

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
          {user.userTechStack?.map((stack: string) => (
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
              postLikeMutation.mutate();
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
                postLikeMutation.mutate();
              }
            }}
          />
        )}
        <Button
          onClick={() => {
            if (!session) {
              alert('로그인이 필요한 기능입니다.');
            } else {
              postChattingRoom([user.id, session.user.id]).then((res) => {
                router.push(`/chat/${res.data.id}`);
              });
            }
          }}
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
  const queryClient = new QueryClient();
  const { userId } = context.query;
  try {
    await queryClient.prefetchQuery('user', () =>
      getUserById(userId as string)
    );
    await queryClient.prefetchQuery('isLiked', () =>
      getIsLiked(userId as string)
    );
  } finally {
    axios.defaults.headers.Cookie = '';
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
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

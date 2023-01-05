import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';
import {
  getIsLiked,
  getUserById,
  postChattingRoom,
  postLikes,
} from 'utils/axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import { Button } from '@mui/material';
import { HeartFilledIcon, HeartIcon } from 'components/Common/Icons';
import BottomController from 'components/Common/BottomController';

export default function OtherUserBottomController() {
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

  return (
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
        disabled={session?.user.id === user.id}
        disableElevation>
        채팅하기
      </Button>
    </BottomController>
  );
}

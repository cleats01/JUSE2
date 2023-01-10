import { Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { postBookmarks, postChattingRoom } from 'utils/axios';
import { Board, User } from '@prisma/client';

import BottomController from 'components/Common/BottomController';
import { BookmarkFilledIcon, BookmarkIcon } from 'components/Common/Icons';

interface boardType extends Board {
  isBookmarked: boolean;
  author: User;
  related: boardData[];
}

interface IProps {
  board: boardType;
  isAdmin: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<{ admin: boolean; apply: boolean }>>;
}

export default function BoardBottomController(props: IProps) {
  const { id: boardId, isBookmarked, authorId, chat, isClosed } = props.board;
  const { isAdmin, setIsDrawerOpen } = props;
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const toggleDrawer = (anchor: string, open: boolean) => {
    setIsDrawerOpen((prev) => ({ ...prev, [anchor]: open }));
  };

  const postBookmarkMutation = useMutation(
    (boardId: string) => postBookmarks(boardId),
    {
      onMutate: async () => {
        await queryClient.cancelQueries('board');

        const previousBoard = queryClient.getQueryData<boardType>('board');

        if (previousBoard) {
          queryClient.setQueryData<boardType>('board', {
            ...previousBoard,
            bookmark: previousBoard.isBookmarked
              ? previousBoard.bookmark - 1
              : previousBoard.bookmark - 1,
            isBookmarked: !previousBoard.isBookmarked,
          });
        }

        return { previousBoard };
      },
      onError: (err, variables, context) => {
        if (context?.previousBoard) {
          queryClient.setQueryData<boardType>('board', context.previousBoard);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries('board');
      },
    }
  );

  return (
    <BottomController>
      {isBookmarked ? (
        <BookmarkFilledIcon
          onClick={() => {
            if (!session) {
              alert('로그인이 필요한 기능입니다.');
              return;
            }
            postBookmarkMutation.mutate(boardId);
          }}
        />
      ) : (
        <BookmarkIcon
          onClick={() => {
            if (!session) {
              alert('로그인이 필요한 기능입니다.');
              return;
            }
            postBookmarkMutation.mutate(boardId);
          }}
        />
      )}
      {isAdmin ? (
        <Button
          onClick={() => {
            if (session?.user.id !== authorId) {
              alert('권한이 없습니다.');
            } else {
              router.push(`/board/${boardId}/chat`);
            }
          }}
          variant='outlined'
          size={'large'}>
          채팅방 {`(${chat})`}
        </Button>
      ) : (
        <Button
          onClick={() => {
            if (!session) {
              alert('로그인이 필요한 기능입니다.');
            } else {
              postChattingRoom([authorId, session.user.id], boardId).then(
                (res) => {
                  router.push(`/chat/${res.data.id}`);
                }
              );
            }
          }}
          variant='outlined'
          size={'large'}>
          채팅하기
        </Button>
      )}
      {isAdmin ? (
        <Button
          variant='contained'
          size={'large'}
          style={{ color: '#fff' }}
          onClick={() => {
            toggleDrawer('admin', true);
          }}
          disableElevation>
          지원관리
        </Button>
      ) : (
        <Button
          variant='contained'
          size={'large'}
          style={{ color: '#fff' }}
          onClick={() => {
            toggleDrawer('apply', true);
          }}
          disabled={isClosed}
          disableElevation>
          {isClosed ? '모집마감' : '지원하기'}
        </Button>
      )}
    </BottomController>
  );
}

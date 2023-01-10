import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { deleteBoard, patchBoardClose } from 'utils/axios';
import { useMutation, useQueryClient } from 'react-query';
import { Board, User } from '@prisma/client';

import { Drawer } from '@mui/material';
import { AngleLeftIcon, DotsVerticalIcon } from 'components/Common/Icons';

interface boardType extends Board {
  isBookmarked: boolean;
  author: User;
  related: boardData[];
}

interface IProps {
  isClosed: boolean;
  isAdmin: boolean;
}

export default function NavbarBoard({ isClosed, isAdmin }: IProps) {
  const router = useRouter();
  const { boardId } = router.query;
  const queryClient = useQueryClient();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleDeleteBoard = async () => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      await deleteBoard(boardId as string);
      alert('게시글이 삭제되었습니다.');
      await router.replace('/');
    }
  };

  const patchBoardCloseMutation = useMutation(
    () => patchBoardClose(boardId as string, isClosed),
    {
      onMutate: async (context) => {
        await queryClient.cancelQueries('board');
        const previousBoard = queryClient.getQueryData<boardType>('board');

        if (previousBoard) {
          queryClient.setQueryData<boardType>('board', {
            ...previousBoard,
            isClosed: !previousBoard.isClosed,
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
    <NavLayout>
      <AngleLeftIcon onClick={router.back} />
      {isAdmin ? (
        <DotsVerticalIcon
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        />
      ) : (
        ''
      )}
      <CustomDrawer
        anchor={'bottom'}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}>
        <DrawerLayout>
          {isClosed ? (
            <li
              onClick={() => {
                patchBoardCloseMutation.mutate();
              }}>
              모집중
            </li>
          ) : (
            <li
              onClick={() => {
                patchBoardCloseMutation.mutate();
              }}>
              모집 마감
            </li>
          )}
          <li
            onClick={() => {
              router.push(`/board/${boardId}/edit`);
            }}>
            게시글 수정
          </li>
          <li onClick={handleDeleteBoard}>게시글 삭제</li>
          <li
            onClick={() => {
              setIsDrawerOpen(false);
            }}>
            닫기
          </li>
        </DrawerLayout>
      </CustomDrawer>
    </NavLayout>
  );
}

const CustomDrawer = styled(Drawer)`
  max-width: 480px;
  margin: auto;
  .MuiDrawer-paper {
    position: absolute;
    bottom: 0;
    border-radius: 15px 15px 0 0;
    max-width: 480px;
  }
`;

const NavLayout = styled.nav`
  position: sticky;
  max-width: 480px;
  height: 55px;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey1};
  background-color: #fff;
  z-index: 2;
`;

const DrawerLayout = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px 0 40px 0;
  > li {
    width: 100%;
    padding: 17px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
  }
`;

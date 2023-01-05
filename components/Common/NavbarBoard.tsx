import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { deleteBoard, patchBoardClose } from 'utils/axios';

import { Drawer } from '@mui/material';
import { AngleLeftIcon, DotsVerticalIcon } from 'components/Common/Icons';

interface IProps {
  isClosed: boolean;
  isAdmin: boolean;
}

export default function NavbarBoard({ isClosed, isAdmin }: IProps) {
  const router = useRouter();

  const { boardId } = router.query;

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleDeleteBoard = async () => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      await deleteBoard(boardId as string);
      alert('게시글이 삭제되었습니다.');
      await router.replace('/');
    }
  };

  const handleBoardClose = async () => {
    await patchBoardClose(boardId as string, isClosed);
  };

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
      <Drawer
        anchor={'bottom'}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}>
        <DrawerLayout>
          {isClosed ? (
            <li onClick={handleBoardClose}>모집중</li>
          ) : (
            <li onClick={handleBoardClose}>모집 마감</li>
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
      </Drawer>
    </NavLayout>
  );
}

const NavLayout = styled.nav`
  position: fixed;
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
  }
`;

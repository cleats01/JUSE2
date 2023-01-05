import { Drawer } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

import BackIcon from '../public/icons/angle-small-left.svg';
import MenuIcon from '../public/icons/menu-dots-vertical.svg';

interface propsType {
  isClosed: boolean;
  isAdmin: boolean;
}

export default function NavbarBoard({ isClosed, isAdmin }: propsType) {
  const router = useRouter();

  const { boardId } = router.query;

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleDeleteBoard = async () => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      await axios.delete(`/api/boards/${boardId}`);
      alert('게시글이 삭제되었습니다.');
      await router.replace('/');
    }
  };

  const handleBoardClose = async () => {
    await axios.patch(`/api/boards/${boardId}?isClosed=${!isClosed}`);
  };

  return (
    <NavLayout>
      <BackIcon onClick={router.back} />
      {isAdmin ? (
        <MenuIcon
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

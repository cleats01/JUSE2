import styled from 'styled-components';
import { SyntheticEvent, useState } from 'react';
import Link from 'next/link';
import { User } from '@prisma/client';

import { Drawer, Tab, Tabs } from '@mui/material';
import { AngleLeftIcon, AngleRightIcon } from 'components/Common/Icons';
import Card from 'components/Common/Card';
import UserInfo from 'components/User/UserInfo';

interface drawer {
  myList: boolean;
  applyList: boolean;
  bookmarkList: boolean;
  likeList: boolean;
}

interface IProps {
  boardsData: myBoardsData | undefined;
  likeListData: User[] | undefined;
}

export default function MyLists(props: IProps) {
  const { boardsData, likeListData } = props;
  const [myListTab, setMyListTab] = useState<string>('내가 만든 모임');
  const [isDrawerOpen, setIsDrawerOpen] = useState<drawer>({
    myList: false,
    applyList: false,
    bookmarkList: false,
    likeList: false,
  });

  const handleMyListTabChange = (e: SyntheticEvent, newValue: string) => {
    setMyListTab(newValue);
  };

  const toggleDrawer = (anchor: string, open: boolean) => {
    setIsDrawerOpen((prev) => ({ ...prev, [anchor]: open }));
  };

  return (
    <ListsContainer>
      <ListItem
        onClick={() => {
          toggleDrawer('myList', true);
        }}>
        <h4>나의 모임</h4>
        <AngleRightIcon width={30} />
      </ListItem>
      <Drawer
        anchor={'right'}
        open={isDrawerOpen.myList}
        onClose={() => {
          toggleDrawer('myList', false);
        }}>
        <DrawerLayout>
          <DrawerHeader>
            <AngleLeftIcon
              onClick={() => {
                toggleDrawer('myList', false);
              }}
            />
            <span>나의 모임</span>
          </DrawerHeader>
          <Tabs
            value={myListTab}
            onChange={handleMyListTabChange}
            variant='fullWidth'>
            <Tab value='내가 만든 모임' label='내가 만든 모임' />
            <Tab value='참여중인 모임' label='참여중인 모임' />
          </Tabs>
          <BoardContainer>
            {myListTab === '내가 만든 모임' ? (
              boardsData?.myList.length ? (
                boardsData.myList.map((board) => (
                  <Card data={board} key={board.id} />
                ))
              ) : (
                <NullMessage>해당하는 모임이 없습니다.</NullMessage>
              )
            ) : boardsData?.acceptedList.length ? (
              boardsData.acceptedList.map((board) => (
                <Card data={board} key={board.id} />
              ))
            ) : (
              <NullMessage>해당하는 모임이 없습니다.</NullMessage>
            )}
          </BoardContainer>
        </DrawerLayout>
      </Drawer>
      <ListItem
        onClick={() => {
          toggleDrawer('applyList', true);
        }}>
        <h4>지원한 모임</h4>
        <AngleRightIcon width={30} />
      </ListItem>
      <Drawer
        anchor={'right'}
        open={isDrawerOpen.applyList}
        onClose={() => {
          toggleDrawer('applyList', false);
        }}>
        <DrawerLayout>
          <DrawerHeader>
            <AngleLeftIcon
              onClick={() => {
                toggleDrawer('applyList', false);
              }}
            />
            <span>지원한 모임</span>
          </DrawerHeader>
          <BoardContainer>
            {boardsData?.applyList.length ? (
              boardsData.applyList.map((board) => (
                <Card data={board} key={board.id} />
              ))
            ) : (
              <NullMessage>해당하는 모임이 없습니다.</NullMessage>
            )}
          </BoardContainer>
        </DrawerLayout>
      </Drawer>
      <ListItem
        onClick={() => {
          toggleDrawer('bookmarkList', true);
        }}>
        <h4>북마크한 모임</h4>
        <AngleRightIcon width={30} />
      </ListItem>
      <Drawer
        anchor={'right'}
        open={isDrawerOpen.bookmarkList}
        onClose={() => {
          toggleDrawer('bookmarkList', false);
        }}>
        <DrawerLayout>
          <DrawerHeader>
            <AngleLeftIcon
              onClick={() => {
                toggleDrawer('bookmarkList', false);
              }}
            />
            <span>북마크한 모임</span>
          </DrawerHeader>
          <BoardContainer>
            {boardsData?.bookmarkList.length ? (
              boardsData.bookmarkList.map((board) => (
                <Card data={board} key={board.id} />
              ))
            ) : (
              <NullMessage>해당하는 모임이 없습니다.</NullMessage>
            )}
          </BoardContainer>
        </DrawerLayout>
      </Drawer>
      <ListItem
        onClick={() => {
          toggleDrawer('likeList', true);
        }}>
        <h4>좋아요한 사용자</h4>
        <AngleRightIcon width={30} />
      </ListItem>
      <Drawer
        anchor={'right'}
        open={isDrawerOpen.likeList}
        onClose={() => {
          toggleDrawer('likeList', false);
        }}>
        <DrawerLayout>
          <DrawerHeader>
            <AngleLeftIcon
              onClick={() => {
                toggleDrawer('likeList', false);
              }}
            />
            <span>좋아요한 사용자</span>
          </DrawerHeader>
          <BoardContainer>
            {likeListData?.length ? (
              likeListData.map((likedUser) => (
                <Link href={`/user/${likedUser.id}`} key={likedUser.id}>
                  <InfoContainer className='border'>
                    <UserInfo user={likedUser} />
                  </InfoContainer>
                </Link>
              ))
            ) : (
              <NullMessage>좋아요한 사용자가 없습니다.</NullMessage>
            )}
          </BoardContainer>
        </DrawerLayout>
      </Drawer>
    </ListsContainer>
  );
}

const InfoContainer = styled.div`
  &.border {
    border-radius: 15px;
    border: 1px solid ${({ theme }) => theme.colors.grey2};
  }
`;

const ListsContainer = styled.ul`
  margin-top: 10px;
  flex-grow: 1;
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
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey1};
  background-color: #fff;
  z-index: 2;
  > svg {
    position: absolute;
    left: 20px;
  }
`;

const DrawerLayout = styled.div`
  width: 100vw;
  max-width: 480px;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
`;

const NullMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding-top: 25vh;
  color: ${({ theme }) => theme.colors.grey4};
`;

import styled from 'styled-components';
import { SyntheticEvent, useState } from 'react';
import Link from 'next/link';
import { User } from '@prisma/client';

import { Drawer, Tab, Tabs } from '@mui/material';
import {
  AngleLeftIcon,
  AngleRightIcon,
  HeartFilledIcon,
} from 'components/Common/Icons';
import Card from 'components/Card';
import { StackBubble } from 'components/Common/TechStackSelector';
import UserImgWrapper from 'components/Common/UserImgWrapper';

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
            {myListTab === '내가 만든 모임'
              ? boardsData?.myList.map((board) => (
                  <Card data={board} key={board.id} />
                ))
              : boardsData?.acceptedList.map((board) => (
                  <Card data={board} key={board.id} />
                ))}
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
            {boardsData?.applyList.map((board) => (
              <Card data={board} key={board.id} />
            ))}
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
            {boardsData?.bookmarkList.map((board) => (
              <Card data={board} key={board.id} />
            ))}
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
            {likeListData?.map((likedUser) => (
              <Link href={`/user/${likedUser.id}`} key={likedUser.id}>
                <InfoContainer className='border'>
                  <ProfileWrapper>
                    <UserImgWrapper size='50px'>
                      <img src={likedUser.image} alt='likedUser-image' />
                    </UserImgWrapper>
                    <span>{likedUser.nickname}</span>
                    <LikeWrapper>
                      <HeartFilledIcon fill={'tomato'} />
                      <span>{likedUser.like}</span>
                    </LikeWrapper>
                  </ProfileWrapper>
                  <TechStackContainer>
                    {likedUser.userTechStack.map((stack) => (
                      <StackBubble
                        key={stack}
                        src={`/icons/stacks/${stack}.png`}
                      />
                    ))}
                  </TechStackContainer>
                </InfoContainer>
              </Link>
            ))}
          </BoardContainer>
        </DrawerLayout>
      </Drawer>
      <ListItem>
        <h4>알림</h4>
      </ListItem>
    </ListsContainer>
  );
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 16px;
  &.border {
    padding: 16px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.grey2};
  }
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
  padding: 55px 16px;
  width: 100vw;
  max-width: 480px;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

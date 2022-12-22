import { SyntheticEvent, useEffect, useState } from 'react';
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
import AngleLeftIcon from '../../public/icons/angle-small-left.svg';
import { Button, Drawer, Tab, Tabs } from '@mui/material';
import { boardData } from '..';
import Card from '../../components/Card';
import { UserImgWrapper } from './signup/[...signup]';
import Link from 'next/link';

interface myBoardsData {
  myList: boardData[];
  applyList: boardData[];
  bookmarkList: boardData[];
}

export default function UserPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const signOutHandler = () => {
    signOut({ callbackUrl: '/login' });
  };
  const [user, setUser] = useState<User>();
  const [boardsData, setBoardsData] = useState<myBoardsData>();
  const [likeListData, setLikeListData] = useState<User[]>();
  const [isDrawerOpen, setIsDrawerOpen] = useState({
    myList: false,
    applyList: false,
    bookmarkList: false,
    likeList: false,
  });

  const toggleDrawer = (anchor: string, open: boolean) => {
    setIsDrawerOpen((prev) => ({ ...prev, [anchor]: open }));
  };

  const [myListTab, setMyListTab] = useState('내가 만든 모임');

  const handleMyListTabChange = (e: SyntheticEvent, newValue: string) => {
    setMyListTab(newValue);
  };

  useEffect(() => {
    const userInfoData = async () => {
      const user: User = await axios
        .get(`/api/users?id=${session?.user.id}`)
        .then((res) => {
          setUser(res.data);
          return res.data;
        });
      await axios.get(`/api/boards/my?id=${session?.user.id}`).then((res) => {
        setBoardsData(res.data);
      });
      if (user.likeList.length) {
        await axios.get(`/api/users?ids=${user.likeList}`).then((res) => {
          setLikeListData(res.data);
        });
      }
    };
    if (status === 'authenticated') {
      userInfoData();
    }
  }, [status]);

  return user ? (
    <UserInfoLayout>
      <NavbarTextOnly centerText='내 정보' />
      <InfoContainer>
        <ProfileWrapper>
          <UserImgWrapper size='50px'>
            <img src={user.image} alt='user-image' />
          </UserImgWrapper>
          <span>{user.nickname}</span>
          <LikeWrapper>
            <HeartFilledIcon fill={'tomato'} />
            <span>{user.like}</span>
          </LikeWrapper>
        </ProfileWrapper>
        <TechStackContainer>
          {user.userTechStack.map((stack) => (
            <StackBubble key={stack} src={`/icons/stacks/${stack}.png`} />
          ))}
        </TechStackContainer>
        <ButtonWrapper>
          <Button
            onClick={() => {
              router.push('/user/edit');
            }}
            variant='outlined'
            size='small'>
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
        <ListItem
          onClick={() => {
            toggleDrawer('myList', true);
          }}>
          <h4>나의 모임</h4>
          <AngleRightIcon width={30} height={30} />
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
              {boardsData?.myList.map((board) => (
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
          <AngleRightIcon width={30} height={30} />
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
          <AngleRightIcon width={30} height={30} />
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
          <AngleRightIcon width={30} height={30} />
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

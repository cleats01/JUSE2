import { Box, Button, Drawer, Tab, Tabs } from '@mui/material';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import NavbarBoard from '../../components/NavbarBoard';
import { StackBubble } from '../add';
import HeartFilledIcon from '../../public/icons/heart-filled.svg';
import BookmarkIcon from '../../public/icons/bookmark.svg';
import BookmarkFilledIcon from '../../public/icons/bookmark-filled.svg';
import { useSession } from 'next-auth/react';
import { position, User } from '@prisma/client';
interface propsType {
  data: {
    id: string;
    type: string;
    place: string;
    period: string;
    position: position[];
    techStack: string[];
    title: string;
    content: string;
    createdAt: Date;
    bookmark: number;
    chat: number;
    isBookmarked: boolean;
    authorId: string;
    author: User;
  };
}

export default function Board({ data }: propsType) {
  const {
    id,
    type,
    place,
    period,
    position,
    techStack,
    title,
    content,
    createdAt,
    chat,
    bookmark,
    isBookmarked,
    authorId,
    author,
  } = data;

  const [currentTab, setCurrentTab] = useState<string>('모집내용');
  const { data: session, status } = useSession();

  const handleTabChange = (e: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    setIsAdmin(session?.user.id === authorId);
  }, [session]);

  const [application, setApplication] = useState([]);

  useEffect(() => {});

  const [isDrawerOpen, setIsDrawerOpen] = useState({
    admin: false,
    apply: false,
  });

  const toggleDrawer = (anchor: string, open: boolean) => {
    setIsDrawerOpen((prev) => ({ ...prev, [anchor]: open }));
  };

  return (
    <BoardLayout>
      <NavbarBoard />
      <BoardHeader>
        <BadgeWrapper>
          <Badge className={type}>{type}</Badge>
          <Badge>{place}</Badge>
        </BadgeWrapper>
        <Title>{title}</Title>
      </BoardHeader>
      <InfoWrapper>
        <Info>
          <InfoLabel>진행 장소</InfoLabel>
          <span>{place}</span>
        </Info>
        <Info>
          <InfoLabel>진행 기간</InfoLabel>
          <span>{period}</span>
        </Info>
        <Info>
          <InfoLabel>기술 스택</InfoLabel>
          <StackWrapper>
            {techStack.map((stack) => (
              <StackBubble src={`/icons/stacks/${stack}.png`} key={stack} />
            ))}
          </StackWrapper>
        </Info>
      </InfoWrapper>
      <Box width={'100%'}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant={'fullWidth'}>
          <Tab value='모집내용' label='모집내용' />
          <Tab value='모집현황' label='모집현황' />
          <Tab value='추천' label='추천' />
        </Tabs>
      </Box>
      <ContentContainer>
        <p>{content}</p>
      </ContentContainer>
      <InfoWrapper className='column'>
        <InfoLabel>모집 현황</InfoLabel>
        {position.map((position) => (
          <PositionInfo key={position.position}>
            <span className='position-name'>{position.position}</span>
            <span>
              {position.accept.length} / {position.count}
            </span>
            <Button
              variant={'outlined'}
              size={'small'}
              onClick={() => {
                axios.post(
                  `/api/applications?boardId=${id}&position=${position.position}`
                );
              }}
              disabled={
                position.pending.includes(session?.user.id) ||
                position.accept.includes(session?.user.id) ||
                position.reject.includes(session?.user.id)
              }>
              {position.pending.includes(session?.user.id) ||
              position.accept.includes(session?.user.id) ||
              position.reject.includes(session?.user.id)
                ? '지원완료'
                : '지원'}
            </Button>
          </PositionInfo>
        ))}
      </InfoWrapper>
      <InfoWrapper className='column'>
        <InfoLabel>팀장 정보</InfoLabel>
        <LeaderInfo>
          <LeaderImage src={''} />
          <LeaderNickname>
            <span className='nickname'>{author.nickname}</span>
            <span className='likes'>
              <HeartFilledIcon width={'15px'} fill={'tomato'} />
              {author.like}
            </span>
          </LeaderNickname>
          <LeaderTechStack>
            {author.userTechStack?.map((stack) => (
              <StackBubble src={`/icons/stacks/${stack}.png`} key={stack} />
            ))}
          </LeaderTechStack>
        </LeaderInfo>
      </InfoWrapper>
      <BottomController>
        {isBookmarked ? (
          <BookmarkFilledIcon
            onClick={() => axios.post(`/api/bookmarks?boardId=${id}`)}
          />
        ) : (
          <BookmarkIcon
            onClick={() => axios.post(`/api/bookmarks?boardId=${id}`)}
          />
        )}
        {isAdmin ? (
          <Button variant='outlined' size={'large'}>
            채팅방 {`(${chat})`}
          </Button>
        ) : (
          <Button variant='outlined' size={'large'}>
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
            disableElevation>
            지원하기
          </Button>
        )}
      </BottomController>
      <Drawer
        anchor={'bottom'}
        open={isDrawerOpen.admin}
        onClose={() => {
          toggleDrawer('admin', false);
        }}>
        <DrawerLayout>
          <DrawerLabel>지원 관리</DrawerLabel>
        </DrawerLayout>
      </Drawer>
    </BoardLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let { cookie } = context.req.headers;
  cookie = cookie ? cookie : '';
  axios.defaults.headers.Cookie = cookie;
  const { boardId } = context.query;
  let res;
  try {
    res = await axios.get(`http://localhost:3000/api/boards/${boardId}`);
  } catch (error) {
    console.error('getServerSideProps basket/wish >> ', error);
  } finally {
    axios.defaults.headers.Cookie = '';
  }

  return { props: { data: res?.data } };
}

const BoardLayout = styled.div`
  padding: 70px 16px;
`;

const BoardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
`;

const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Badge = styled.div`
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.grey4};
  &.스터디 {
    background-color: ${({ theme }) => theme.colors.tiffanyblue};
  }
  &.프로젝트 {
    background-color: ${({ theme }) => theme.colors.purple1};
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 20px;
  line-height: 1.4;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
  &.column {
    flex-direction: column;
    row-gap: 15px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  min-width: 50%;
`;

const InfoLabel = styled.span`
  font-weight: 700;
`;

const StackWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const ContentContainer = styled.div`
  padding: 20px 10px;
  min-height: 150px;
  font-size: 16px;
  line-height: 1.5;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
`;

const PositionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .position-name {
    width: 40%;
  }
`;

const LeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LeaderImage = styled.img`
  width: 45px;
  border-radius: 99px;
`;

const LeaderNickname = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  > .nickname {
    font-weight: 700;
  }
  > .likes {
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${({ theme }) => theme.colors.grey4};
    font-size: 12px;
  }
`;

const LeaderTechStack = styled(StackWrapper)`
  margin-left: auto;
`;

const BottomController = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: #fff;
  padding: 15px;
  max-width: 480px;
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    margin: 0 10px 0 5px;
  }
  button {
    flex-grow: 1;
  }
`;

const DrawerLayout = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const DrawerLabel = styled.h3`
  font-weight: 700;
  font-size: 18px;
  margin: auto;
`;

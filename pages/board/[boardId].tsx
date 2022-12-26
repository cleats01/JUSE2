import { Box, Button, Drawer, Tab, Tabs } from '@mui/material';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import React, {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import NavbarBoard from '../../components/NavbarBoard';
import { StackBubble } from '../add';
import HeartFilledIcon from '../../public/icons/heart-filled.svg';
import BookmarkIcon from '../../public/icons/bookmark.svg';
import BookmarkFilledIcon from '../../public/icons/bookmark-filled.svg';
import CloseIcon from '../../public/icons/cross-small.svg';
import { useSession } from 'next-auth/react';
import { Board, position, User } from '@prisma/client';
import { UserImgWrapper } from '../user/signup/[...signup]';
import BottomController from '../../components/BottomController';
import Link from 'next/link';
import { boardData } from '..';
import Card from '../../components/Card';
import Related from '../../components/Related';
interface propsType extends Board {
  isBookmarked: boolean;
  author: User;
  related: boardData[];
}

export default function BoardPage(props: propsType) {
  const {
    id,
    type,
    place,
    period,
    application,
    techStack,
    title,
    content,
    createdAt,
    chat,
    bookmark,
    isBookmarked,
    authorId,
    author,
    isClosed,
    related,
  } = props;

  const [currentTab, setCurrentTab] = useState<string>('모집내용');
  const { data: session, status } = useSession();

  const handleTabChange = (e: SyntheticEvent, newValue: string) => {
    const tabs = ['모집내용', '모집현황', '추천'];
    const index = tabs.indexOf(newValue);
    const headerHeight = 55 + 48;
    const { offsetTop } = getDimensions(tabRef.current[index] as HTMLElement);
    window.scrollTo({
      top: newValue === '모집내용' ? 0 : offsetTop - headerHeight,
      behavior: 'smooth',
    });
  };

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    setIsAdmin(session?.user.id === authorId);
  }, [session]);

  const [isDrawerOpen, setIsDrawerOpen] = useState({
    admin: false,
    apply: false,
  });

  const toggleDrawer = (anchor: string, open: boolean) => {
    setIsDrawerOpen((prev) => ({ ...prev, [anchor]: open }));
  };

  const [applicationTab, setApplicationTab] = useState<
    'pending' | 'accept' | 'reject'
  >('pending');

  const handleApplicationTab = (
    e: SyntheticEvent,
    newValue: 'pending' | 'accept' | 'reject'
  ) => {
    setApplicationTab(newValue);
  };

  // 스크롤 탭 기능
  const tabRef = useRef<HTMLElement[] | null[]>([]);

  const sectionRefs = [
    { section: '모집내용', ref: tabRef.current[0] },
    { section: '모집현황', ref: tabRef.current[1] },
    { section: '추천', ref: tabRef.current[2] },
  ];

  const getDimensions = (ele: HTMLElement) => {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;

    return {
      height,
      offsetTop,
      offsetBottom,
    };
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 55 + 48;

    const selected = sectionRefs.find(({ section, ref }) => {
      if (ref) {
        const { offsetBottom, offsetTop } = getDimensions(ref);
        return scrollPosition >= offsetTop && scrollPosition < offsetBottom;
      }
    });

    if (selected && selected.section !== currentTab) {
      setCurrentTab(selected.section);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
      window.addEventListener('touchmove', handleScroll);
    };
  });

  return (
    <BoardLayout>
      <NavbarBoard isClosed={isClosed} isAdmin={isAdmin} />
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
      <Box
        sx={{
          position: 'sticky',
          top: '55px',
          backgroundColor: '#fff',
          zIndex: 2,
        }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant={'fullWidth'}>
          <Tab value='모집내용' label='모집내용' />
          <Tab value='모집현황' label='모집현황' />
          <Tab value='추천' label='추천' />
        </Tabs>
      </Box>
      <section ref={(el) => (tabRef.current[0] = el)}>
        <ContentContainer>
          <p>{content}</p>
        </ContentContainer>
      </section>
      <section ref={(el) => (tabRef.current[1] = el)}>
        <InfoWrapper className='column'>
          <InfoLabel>모집 현황</InfoLabel>
          {application.map((position) => (
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
                  position.pending.filter(
                    (user) => user.id === session?.user.id
                  ).length > 0 ||
                  position.accept.filter((user) => user.id === session?.user.id)
                    .length > 0 ||
                  position.reject.filter((user) => user.id === session?.user.id)
                    .length > 0
                }>
                {position.pending.filter((user) => user.id === session?.user.id)
                  .length > 0 ||
                position.accept.filter((user) => user.id === session?.user.id)
                  .length > 0 ||
                position.reject.filter((user) => user.id === session?.user.id)
                  .length > 0
                  ? '지원완료'
                  : '지원'}
              </Button>
            </PositionInfo>
          ))}
        </InfoWrapper>
        <InfoWrapper className='column'>
          <InfoLabel>팀장 정보</InfoLabel>
          <Link href={`/user/${author.id}`}>
            <LeaderInfo>
              <UserImgWrapper size={'45px'}>
                <img src={author.image} alt={'user-image'} />
              </UserImgWrapper>
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
          </Link>
        </InfoWrapper>
      </section>
      <section ref={(el) => (tabRef.current[2] = el)}>
        <Related data={related} />
      </section>
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
          <DrawerHeader>
            <DrawerLabel>지원 관리</DrawerLabel>
            <CloseIcon
              onClick={() => {
                toggleDrawer('admin', false);
              }}
            />
          </DrawerHeader>
          <Box width={'100%'}>
            <Tabs
              value={applicationTab}
              onChange={handleApplicationTab}
              variant={'fullWidth'}>
              <Tab
                value='pending'
                label={`지원자 ${application.reduce(
                  (acc, cur) => acc + cur.pending.length,
                  0
                )}`}
              />
              <Tab
                value='accept'
                label={`수락됨 ${application.reduce(
                  (acc, cur) => acc + cur.accept.length,
                  0
                )}`}
              />
              <Tab
                value='reject'
                label={`거절됨 ${application.reduce(
                  (acc, cur) => acc + cur.reject.length,
                  0
                )}`}
              />
            </Tabs>
          </Box>
          <ApplicationContainer>
            {application.map((position, index) => (
              <div key={index}>
                <PostionLabel>
                  <span>{position.position}</span>
                  <span>{`${position.accept.length} / ${position.count}`}</span>
                </PostionLabel>
                {position[applicationTab].map((user) => (
                  <UserWrapper key={user.id}>
                    <Link href={`/user/${user.id}`}>
                      <UserImgWrapper size='40px'>
                        <img src={user.image} alt={'user-image'} />
                      </UserImgWrapper>
                    </Link>
                    <Link href={`/user/${user.id}`}>
                      <span className='user-nickname'>{user.nickname}</span>
                    </Link>
                    {applicationTab === 'pending' ? (
                      <ButtonWrapper>
                        <Button
                          sx={{ minWidth: '50px' }}
                          size='small'
                          variant='outlined'
                          disableElevation
                          onClick={() => {
                            axios.patch(
                              `/api/applications?boardId=${id}&applicantId=${user.id}&position=${position.position}&to=reject`
                            );
                          }}>
                          거절
                        </Button>
                        <Button
                          sx={{ color: '#fff', minWidth: '50px' }}
                          size='small'
                          variant='contained'
                          disableElevation
                          onClick={() => {
                            position.count === position.accept.length
                              ? alert('모집 정원이 가득찼습니다.')
                              : axios.patch(
                                  `/api/applications?boardId=${id}&applicantId=${user.id}&position=${position.position}&to=accept`
                                );
                          }}>
                          수락
                        </Button>
                      </ButtonWrapper>
                    ) : (
                      <ButtonWrapper>
                        <Button
                          sx={{ minWidth: '50px' }}
                          size='small'
                          variant='outlined'
                          disableElevation
                          onClick={() => {
                            axios.patch(
                              `/api/applications?boardId=${id}&applicantId=${user.id}&position=${position.position}&to=pending`
                            );
                          }}>
                          취소
                        </Button>
                      </ButtonWrapper>
                    )}
                  </UserWrapper>
                ))}
              </div>
            ))}
          </ApplicationContainer>
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
  let data;
  let related;
  try {
    data = await axios
      .get(`${process.env.BASE_URL}/api/boards/${boardId}`)
      .then((res) => res.data);
    related = await axios
      .get(`${process.env.BASE_URL}/api/boards/related?boardId=${boardId}`)
      .then((res) => res.data);
  } catch (error) {
    console.error('getServerSideProps board/:boardId >> ', error);
  } finally {
    axios.defaults.headers.Cookie = '';
  }

  return { props: { ...data, related } };
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

const DrawerLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
`;

const DrawerHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: #fff;
  z-index: 2;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
  > svg {
    position: absolute;
    right: 20px;
  }
`;

const DrawerLabel = styled.h3`
  font-weight: 700;
  font-size: 18px;
  margin: 0 auto;
`;

const ApplicationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
`;

const PostionLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 18px;
  padding: 20px 10px 15px 10px;
  span:nth-child(2) {
    font-weight: 400;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
  .user-nickname {
    font-size: 14px;
    font-weight: 700;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;

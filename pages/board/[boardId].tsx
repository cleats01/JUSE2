import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  Drawer,
  Tab,
  Tabs,
} from '@mui/material';
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
import AngleDownIcon from '../../public/icons/angle-small-down.svg';
import CloseIcon from '../../public/icons/cross-small.svg';
import { useSession } from 'next-auth/react';
import { Board, position, User, userSimple } from '@prisma/client';
import { UserImgWrapper } from '../user/signup/[...signup]';
import BottomController from '../../components/BottomController';
import Link from 'next/link';
import { boardData } from '..';
import Related from '../../components/Related';
import theme from '../../styles/theme';
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import {
  deleteApplications,
  getBoardById,
  getRelated,
  patchApplications,
  postApplications,
  postBookmarks,
  postChattingRoom,
} from '../../utils/axios';
import { useRouter } from 'next/router';
import ContentViewer from '../../components/ContentViewer';
interface propsType {
  dehydratedState: DehydratedState;
}
interface boardType extends Board {
  isBookmarked: boolean;
  author: User;
  related: boardData[];
}

export default function BoardPage(props: propsType) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const boardId: string = router.query.boardId as string;

  const { data: boardData } = useQuery(
    'board',
    () => getBoardById(boardId),
    {}
  );

  const { data: relatedData } = useQuery(
    'related',
    () => getRelated(boardId),
    {}
  );

  const board: boardType = { ...boardData, related: relatedData };

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
  } = board;

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

  const [currentTab, setCurrentTab] = useState<string>('모집내용');
  const tabRef = useRef<HTMLElement[] | null[]>([]);

  const handleTabChange = (e: SyntheticEvent, newValue: string) => {
    const tabs = ['모집내용', '모집현황', '추천'];
    const index = tabs.indexOf(newValue);
    const headerHeight = 55 + 48;
    const { offsetTop } = getDimensions(tabRef.current[index] as HTMLElement);
    window.scrollTo({
      top: newValue === '모집내용' ? 0 : offsetTop - headerHeight,
      behavior: 'smooth',
    });
    setTimeout(() => setCurrentTab(newValue), 300);
  };

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
    const scrollPosition = window.scrollY + 55 + 48 + 100;

    const selected = sectionRefs.find(({ section, ref }) => {
      if (ref) {
        const { offsetBottom, offsetTop } = getDimensions(ref);
        return scrollPosition > offsetTop && scrollPosition < offsetBottom;
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
      window.removeEventListener('touchmove', handleScroll);
    };
  });

  const getMyApplyStatus = (position: position): string => {
    const { pending, accept, reject } = position;
    let status = '지원한 이력이 없습니다.';
    if (pending.filter((user) => user.id === session?.user.id).length) {
      return '지원완료';
    } else if (accept.filter((user) => user.id === session?.user.id).length) {
      return '수락됨';
    } else if (reject.filter((user) => user.id === session?.user.id).length) {
      return '거절됨';
    }
    return status;
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

  const postApplicationMutation = useMutation(
    ({
      boardId,
      positionName,
      applicantId,
    }: {
      boardId: string;
      positionName: string;
      applicantId: string;
    }) => postApplications(boardId, positionName, applicantId),
    {
      onMutate: async (context) => {
        await queryClient.cancelQueries('board');

        const previousBoard = queryClient.getQueryData<boardType>('board');

        if (previousBoard) {
          queryClient.setQueryData<boardType>('board', {
            ...previousBoard,
            application: previousBoard.application.map((position) => {
              if (position.position === context.positionName) {
                position.pending.push({
                  id: context.applicantId,
                  image: session?.user.image,
                  nickname: session?.user.nickname,
                });
              }
              return position;
            }),
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

  const deleteApplicationMutation = useMutation(
    ({
      boardId,
      positionName,
      applicantId,
    }: {
      boardId: string;
      positionName: string;
      applicantId: string;
    }) => deleteApplications(boardId, positionName, applicantId),
    {
      onMutate: async (context) => {
        await queryClient.cancelQueries('board');
        const previousBoard = queryClient.getQueryData<boardType>('board');

        if (previousBoard) {
          queryClient.setQueryData<boardType>('board', {
            ...previousBoard,
            application: previousBoard.application.map((position) => {
              if (position.position === context.positionName) {
                position.pending = position.pending.filter(
                  (user) => user.id !== context.applicantId
                );
                position.accept = position.accept.filter(
                  (user) => user.id !== context.applicantId
                );
                position.reject = position.reject.filter(
                  (user) => user.id !== context.applicantId
                );
              }
              return position;
            }),
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

  const patchApplicationMutation = useMutation(
    ({
      boardId,
      positionName,
      applicantId,
      where,
    }: {
      boardId: string;
      positionName: string;
      applicantId: string;
      where: string;
    }) => patchApplications(boardId, positionName, applicantId, where),
    {
      onMutate: async (context) => {
        await queryClient.cancelQueries('board');
        const previousBoard = queryClient.getQueryData<boardType>('board');

        if (previousBoard) {
          queryClient.setQueryData<boardType>('board', {
            ...previousBoard,
            application: previousBoard.application.map((position) => {
              if (position.position === context.positionName) {
                if (context.where === 'accept') {
                  const acceptedUser = position.pending.find(
                    (applicant) => applicant.id === context.applicantId
                  );
                  if (acceptedUser) {
                    position.pending = position.pending.filter(
                      (applicant) => applicant.id !== context.applicantId
                    );
                    position.accept.push(acceptedUser);
                  }
                } else if (context.where === 'reject') {
                  const rejectedUser = position.pending.find(
                    (applicant) => applicant.id === context.applicantId
                  );
                  if (rejectedUser) {
                    position.pending = position.pending.filter(
                      (applicant) => applicant.id !== context.applicantId
                    );
                    position.reject.push(rejectedUser);
                  }
                } else {
                  const user =
                    position.accept.find(
                      (applicant) => applicant.id === context.applicantId
                    ) ||
                    position.reject.find(
                      (applicant) => applicant.id === context.applicantId
                    );
                  if (user) {
                    position.accept = position.accept.filter(
                      (applicant) => applicant.id !== context.applicantId
                    );
                    position.reject = position.reject.filter(
                      (applicant) => applicant.id !== context.applicantId
                    );
                    position.pending.push(user);
                  }
                }
              }
              return position;
            }),
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
        <ContentViewer content={content} />
      </section>
      <section ref={(el) => (tabRef.current[1] = el)}>
        <InfoWrapper className='column'>
          <InfoLabel>모집 현황</InfoLabel>
          <div>
            {application.map((position) => (
              <AccordionCustom
                key={position.position}
                square
                disableGutters
                elevation={0}>
                <AccordionSummary
                  expandIcon={
                    <AngleDownIcon
                      fill={theme.colors.grey4}
                      width={25}
                      height={25}
                    />
                  }
                  aria-controls='panel1a-content'
                  id='panel1a-header'>
                  <PositionInfo>
                    <span className='position-name'>{position.position}</span>
                    <span className='position-count'>
                      {position.accept.length} / {position.count}
                    </span>
                  </PositionInfo>
                </AccordionSummary>
                <AccordionDetails>
                  {position.accept.length ? (
                    <UserChipsWrapper>
                      {position.accept.map((user: userSimple) => (
                        <Chip
                          key={user.id}
                          avatar={
                            <Avatar alt={user.nickname} src={user.image} />
                          }
                          label={user.nickname}
                          variant='outlined'
                          component='a'
                          href={`/user/${user.id}`}
                          clickable
                        />
                      ))}
                    </UserChipsWrapper>
                  ) : (
                    <NullMessage>
                      해당 포지션에 참여중인 유저가 없습니다.
                    </NullMessage>
                  )}
                </AccordionDetails>
              </AccordionCustom>
            ))}
          </div>
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
          <BookmarkFilledIcon onClick={() => postBookmarkMutation.mutate(id)} />
        ) : (
          <BookmarkIcon onClick={() => postBookmarkMutation.mutate(id)} />
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
                {position[applicationTab].length ? (
                  position[applicationTab].map((user) => (
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
                              patchApplicationMutation.mutate({
                                boardId: id,
                                positionName: position.position,
                                applicantId: user.id,
                                where: 'reject',
                              });
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
                                : patchApplicationMutation.mutate({
                                    boardId: id,
                                    positionName: position.position,
                                    applicantId: user.id,
                                    where: 'accept',
                                  });
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
                              patchApplicationMutation.mutate({
                                boardId: id,
                                positionName: position.position,
                                applicantId: user.id,
                                where: 'pending',
                              });
                            }}>
                            취소
                          </Button>
                        </ButtonWrapper>
                      )}
                    </UserWrapper>
                  ))
                ) : (
                  <NullMessage>유저가 없습니다.</NullMessage>
                )}
              </div>
            ))}
          </ApplicationContainer>
        </DrawerLayout>
      </Drawer>
      <Drawer
        anchor={'bottom'}
        open={isDrawerOpen.apply}
        onClose={() => {
          toggleDrawer('apply', false);
        }}>
        <DrawerLayout>
          <DrawerHeader>
            <DrawerLabel>지원하기</DrawerLabel>
            <CloseIcon
              onClick={() => {
                toggleDrawer('apply', false);
              }}
            />
          </DrawerHeader>
          <ApplyContainer>
            {application.map((position) => (
              <ApplyPositionWrapper key={position.position}>
                <PositionInfo>
                  <span className='position-name'>{position.position}</span>
                  <span>
                    {position.accept.length} / {position.count}
                  </span>
                  {getMyApplyStatus(position) === '지원한 이력이 없습니다.' ? (
                    <Button
                      variant={'contained'}
                      size={'small'}
                      style={{ color: '#fff' }}
                      disableElevation
                      onClick={() => {
                        if (!session) {
                          alert('로그인이 필요한 기능입니다.');
                          return;
                        }
                        postApplicationMutation.mutate({
                          boardId: id,
                          positionName: position.position,
                          applicantId: session.user.id,
                        });
                      }}>
                      지원
                    </Button>
                  ) : (
                    <Button
                      variant={'outlined'}
                      size={'small'}
                      onClick={() => {
                        deleteApplicationMutation.mutate({
                          boardId: id,
                          positionName: position.position,
                          applicantId: session?.user.id,
                        });
                      }}>
                      취소
                    </Button>
                  )}
                </PositionInfo>
                <ApplyStatus>
                  <span>지원 상태</span>
                  <span>{getMyApplyStatus(position)}</span>
                </ApplyStatus>
              </ApplyPositionWrapper>
            ))}
          </ApplyContainer>
        </DrawerLayout>
      </Drawer>
    </BoardLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let { cookie } = context.req.headers;
  cookie = cookie ? cookie : '';
  axios.defaults.headers.Cookie = cookie;
  const queryClient = new QueryClient();
  const { boardId } = context.query;
  try {
    await queryClient.prefetchQuery('board', () =>
      getBoardById(boardId as string)
    );
    await queryClient.prefetchQuery('related', () =>
      getRelated(boardId as string)
    );
  } catch (error) {
    console.error('getServerSideProps board/:boardId >> ', error);
  } finally {
    axios.defaults.headers.Cookie = '';
  }

  return { props: { dehydratedState: dehydrate(queryClient) } };
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
  width: 100%;
  height: 35px;
  > .position-name {
    font-weight: 500;
    width: 40%;
  }
  > .position-count {
    margin-right: 60px;
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
    font-size: 14px;
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
  min-height: 50vh;
  max-height: 80vh;
  padding-bottom: 40px;
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

const NullMessage = styled.span`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.grey4};
`;

const ApplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const ApplyPositionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
`;

const ApplyStatus = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey4};
  > :first-child {
    font-weight: 600;
  }
`;

const AccordionCustom = styled(Accordion)`
  &:before {
    display: none;
  }
  .MuiButtonBase-root {
    padding: 0;
  }
  .MuiAccordionDetails-root {
    padding: 0;
  }
`;

const UserChipsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

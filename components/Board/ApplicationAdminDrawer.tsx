import styled from 'styled-components';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import Link from 'next/link';
import { patchApplications } from 'utils/axios';
import { useMutation, useQueryClient } from 'react-query';
import { Board, position, User } from '@prisma/client';

import { Box, Button, Drawer, Tab, Tabs } from '@mui/material';
import { CrossIcon } from 'components/Common/Icons';
import UserImgWrapper from 'components/Common/UserImgWrapper';
import {
  DrawerHeader,
  DrawerLabel,
  DrawerLayout,
} from 'components/Board/BoardPage';

interface boardType extends Board {
  isBookmarked: boolean;
  author: User;
  related: boardData[];
}

interface IProps {
  boardId: string;
  application: position[];
  isDrawerOpen: { admin: boolean; apply: boolean };
  setIsDrawerOpen: Dispatch<SetStateAction<{ admin: boolean; apply: boolean }>>;
}

export default function ApplicationAdminDrawer(props: IProps) {
  const { boardId, application, isDrawerOpen, setIsDrawerOpen } = props;
  const queryClient = useQueryClient();
  const [applicationTab, setApplicationTab] = useState<
    'pending' | 'accept' | 'reject'
  >('pending');

  const handleApplicationTab = (
    e: SyntheticEvent,
    newValue: 'pending' | 'accept' | 'reject'
  ) => {
    setApplicationTab(newValue);
  };

  const toggleDrawer = (anchor: string, open: boolean) => {
    setIsDrawerOpen((prev) => ({ ...prev, [anchor]: open }));
  };

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
    <Drawer
      anchor={'bottom'}
      open={isDrawerOpen.admin}
      onClose={() => {
        toggleDrawer('admin', false);
      }}>
      <DrawerLayout>
        <DrawerHeader>
          <DrawerLabel>지원 관리</DrawerLabel>
          <CrossIcon
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
              <PositionLabel>
                <span>{position.position}</span>
                <span>{`${position.accept.length} / ${position.count}`}</span>
              </PositionLabel>
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
                              boardId,
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
                                  boardId,
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
                              boardId,
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
  );
}

const ApplicationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PositionLabel = styled.div`
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

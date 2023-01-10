import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { Board, position, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteApplications, postApplications } from 'utils/axios';

import { Button, Drawer } from '@mui/material';
import { CrossIcon } from 'components/Common/Icons';
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

export default function ApplyDrawer(props: IProps) {
  const { boardId, application, isDrawerOpen, setIsDrawerOpen } = props;
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const toggleDrawer = (anchor: string, open: boolean) => {
    setIsDrawerOpen((prev) => ({ ...prev, [anchor]: open }));
  };

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
    <CustomDrawer
      anchor={'bottom'}
      open={isDrawerOpen.apply}
      onClose={() => {
        toggleDrawer('apply', false);
      }}>
      <DrawerLayout>
        <DrawerHeader>
          <DrawerLabel>지원하기</DrawerLabel>
          <CrossIcon
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
                        boardId,
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
                        boardId,
                        positionName: position.position,
                        applicantId: session?.user.id,
                      });
                    }}
                    disabled={getMyApplyStatus(position) !== '지원완료'}>
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
    </CustomDrawer>
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

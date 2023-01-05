import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Board, User } from '@prisma/client';
import { DehydratedState, useQuery } from 'react-query';
import { getBoardById, getRelated } from 'utils/axios';

import NavbarBoard from 'components/NavbarBoard';
import ContentViewer from 'components/Board/ContentViewer';
import BoardHeader from 'components/Board/BoardHeader';
import BoardTab from 'components/Board/BoardTab';
import AcceptedStatus from 'components/Board/AcceptedStatus';
import LeaderInfo from 'components/Board/LeaderInfo';
import BoardBottomController from 'components/Board/BoardBottomController';
import ApplicationAdminDrawer from 'components/Board/ApplicationAdminDrawer';
import ApplyDrawer from 'components/Board/ApplyDrawer';
import BasicInfo from 'components/Board/BasicInfo';
import Related from 'components/Board/Related';

interface boardType extends Board {
  isBookmarked: boolean;
  author: User;
  related: boardData[];
}

interface IProps {
  dehydratedState: DehydratedState;
}

export default function BoardPage(props: IProps) {
  const { data: session, status } = useSession();
  const [currentTab, setCurrentTab] = useState<string>('모집내용');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const tabRef = useRef<HTMLElement[] | null[]>([]);

  const { data: boardData } = useQuery('board', () => getBoardById(boardId));
  const { data: relatedData } = useQuery('related', () => getRelated(boardId));

  const board: boardType = { ...boardData, related: relatedData };

  const {
    id: boardId,
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

  useEffect(() => {
    setIsAdmin(session?.user.id === authorId);
  }, [session]);

  const [isDrawerOpen, setIsDrawerOpen] = useState<{
    admin: boolean;
    apply: boolean;
  }>({
    admin: false,
    apply: false,
  });

  const drawerProps = { boardId, application, isDrawerOpen, setIsDrawerOpen };

  return (
    <BoardLayout>
      <NavbarBoard isClosed={isClosed} isAdmin={isAdmin} />
      <BoardHeader type={type} place={place} title={title} />
      <BasicInfo place={place} period={period} techStack={techStack} />
      <BoardTab
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        tabRef={tabRef}
      />
      <section ref={(el) => (tabRef.current[0] = el)}>
        <ContentViewer content={content} />
      </section>
      <section ref={(el) => (tabRef.current[1] = el)}>
        <AcceptedStatus application={application} />
        <LeaderInfo author={author} />
      </section>
      <section ref={(el) => (tabRef.current[2] = el)}>
        <Related data={related} />
      </section>
      <BoardBottomController {...{ board, isAdmin, setIsDrawerOpen }} />
      <ApplicationAdminDrawer {...drawerProps} />
      <ApplyDrawer {...drawerProps} />
    </BoardLayout>
  );
}

const BoardLayout = styled.div`
  padding: 70px 16px;
`;

export const InfoWrapper = styled.div`
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

export const InfoLabel = styled.span`
  font-weight: 700;
`;

export const DrawerLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  max-height: 80vh;
  padding-bottom: 40px;
`;

export const DrawerHeader = styled.div`
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

export const DrawerLabel = styled.h3`
  font-weight: 700;
  font-size: 18px;
  margin: 0 auto;
`;

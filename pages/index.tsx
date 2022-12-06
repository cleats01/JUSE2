import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import TabBar from '../components/TabBar';
import styled from 'styled-components';
import NavbarMain from '../components/NavbarMain';
import Card from '../components/Card';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

interface boardData {
  id: string;
  type: string;
  place: string;
  title: string;
  techStack: string[];
}

export default function Home() {
  const { data: session, status } = useSession();
  const [ref, inView] = useInView();

  const getBoards = (query: string) => {
    return axios.get('/api/boards' + query).then((res) => res.data);
  };

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['board'],
    ({ pageParam = '' }) => getBoards(`?id=${pageParam}`),
    {
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <HomeLayout>
      <NavbarMain />
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page?.map((board: boardData, i: number) => (
            <Card
              key={board.id}
              data={{
                type: board.type,
                place: board.place,
                title: board.title,
                techStack: board.techStack,
              }}
            />
          ))}
        </React.Fragment>
      ))}
      <div ref={ref}>observer</div>
      <TabBar />
    </HomeLayout>
  );
}

const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 70px 16px;
`;

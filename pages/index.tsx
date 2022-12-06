import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import TabBar from '../components/TabBar';
import styled from 'styled-components';
import NavbarMain from '../components/NavbarMain';
import Card from '../components/Card';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { Box, Tab, Tabs } from '@mui/material';
import FilterIcon from '../public/icons/settings-sliders.svg';

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
  const [currentTab, setCurrentTab] = useState('');

  const getBoards = (query: string) => {
    return axios.get('/api/boards' + query).then((res) => res.data);
  };

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [currentTab],
    ({ pageParam = '' }) => getBoards(`?id=${pageParam}&type=${currentTab}`),
    {
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const handleTabChange = (e: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <HomeLayout>
      <NavbarMain />
      <FilterContainer>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab value='' label='전체' />
          <Tab value='프로젝트' label='프로젝트' />
          <Tab value='스터디' label='스터디' />
        </Tabs>
        <FilterIcon />
      </FilterContainer>
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

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

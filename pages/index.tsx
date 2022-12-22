import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import TabBar from '../components/TabBar';
import styled from 'styled-components';
import NavbarMain from '../components/NavbarMain';
import Card from '../components/Card';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Slider,
  Switch,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import FilterIcon from '../public/icons/settings-sliders.svg';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TechStack from '../components/TechStack';
import { position } from '@prisma/client';

export interface boardData {
  id: string;
  type: string;
  place: string;
  title: string;
  techStack: string[];
  application: position[];
  bookmark: number;
  chat: number;
  isClosed: boolean;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [ref, inView] = useInView();
  const [currentTab, setCurrentTab] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const getBoards = (query: string) => {
    return axios.get('/api/boards' + query).then((res) => res.data);
  };

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const handleTabChange = (e: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const [place, setPlace] = useState('');
  const [offline, setOffline] = useState('');
  const offlinePlace: string[] = [
    '서울',
    '경기',
    '인천',
    '강원',
    '충북',
    '충남',
    '대전',
    '세종',
    '경북',
    '경남',
    '부산',
    '대구',
    '울산',
    '전남',
    '광주',
    '전북',
    '제주',
  ];
  const handlePlace = (
    event: React.MouseEvent<HTMLElement>,
    newPlace: string
  ) => {
    if (newPlace === null) {
      setPlace('');
      return;
    }
    setPlace(newPlace);
  };
  const handleOffline = (event: SelectChangeEvent) => {
    setOffline(event.target.value as string);
  };

  const [period, setPeriod] = React.useState<number[]>([1, 6]);

  const handlePeriod = (event: Event, newValue: number | number[]) => {
    setPeriod(newValue as number[]);
  };

  const marks = [
    {
      value: 1,
      label: '1개월',
    },
    {
      value: 2,
      label: '2개월',
    },
    {
      value: 3,
      label: '3개월',
    },
    {
      value: 4,
      label: '4개월',
    },
    {
      value: 5,
      label: '5개월',
    },
    {
      value: 6,
      label: '6개월',
    },
  ];

  const [techStack, setTechStack] = useState<string[]>([]);

  const resetFilter = () => {
    setIsClosed(true);
    setOffline('');
    setPlace('');
    setPeriod([1, 6]);
    setTechStack([]);
  };

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [currentTab, place, offline, period, techStack, isClosed],
    ({ pageParam = '' }) =>
      getBoards(
        `?id=${pageParam}&type=${currentTab}&place=${
          offline ? offline : place
        }&period=${period.join(',')}&techStack=${techStack.join(
          ','
        )}&isClosed=${isClosed}`
      ),
    {
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
    }
  );

  return (
    <HomeLayout>
      <NavbarMain />
      <TabContainer>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab value='' label='전체' />
          <Tab value='프로젝트' label='프로젝트' />
          <Tab value='스터디' label='스터디' />
        </Tabs>
        <FilterIcon width={18} onClick={toggleFilter} />
      </TabContainer>
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page?.map((board: boardData) => (
            <Card key={board.id} data={board} />
          ))}
        </React.Fragment>
      ))}
      <div ref={ref}></div>
      <Drawer anchor='bottom' open={isFilterOpen} onClose={toggleFilter}>
        <FilterContainer>
          <DrawerHeader>
            <span>상세필터</span>
          </DrawerHeader>
          <Wrapper>
            <StatusFilterWrapper>
              <span>모집중만 보기</span>
              <Switch
                checked={!isClosed}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setIsClosed(!event.target.checked);
                }}
              />
            </StatusFilterWrapper>
          </Wrapper>
          <Wrapper>
            <Label>장소구분</Label>
            <ToggleButtonGroup
              size='small'
              color='primary'
              value={place}
              exclusive
              onChange={handlePlace}>
              <ToggleButton value='온라인'>온라인</ToggleButton>
              <ToggleButton value='오프라인'>오프라인</ToggleButton>
              {place === '오프라인' ? (
                <Box sx={{ minWidth: 90, marginLeft: '10px' }}>
                  <FormControl size='small' fullWidth>
                    <InputLabel>지역</InputLabel>
                    <Select
                      value={offline}
                      label='지역'
                      onChange={handleOffline}>
                      {offlinePlace.map((el: string) => (
                        <MenuItem value={el}>{el}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              ) : (
                ''
              )}
            </ToggleButtonGroup>
          </Wrapper>
          <Wrapper>
            <Label>진행기간</Label>
            <Box
              sx={{ padding: '0 20px', minWidth: '250px', maxWidth: '350px' }}>
              <Slider
                value={period}
                onChange={handlePeriod}
                min={1}
                max={6}
                valueLabelDisplay='auto'
                marks={marks}
              />
            </Box>
          </Wrapper>
          <Wrapper>
            <Label>기술스택</Label>
            <TechStack selected={techStack} setSelected={setTechStack} />
          </Wrapper>
          <ButtonContainer>
            <Button variant={'outlined'} onClick={resetFilter}>
              초기화
            </Button>
            <Button
              variant={'contained'}
              onClick={toggleFilter}
              style={{ color: '#fff' }}
              disableElevation>
              필터 적용
            </Button>
          </ButtonContainer>
        </FilterContainer>
      </Drawer>
      <TabBar />
    </HomeLayout>
  );
}

const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 55px 16px;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  > span {
    margin: auto;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 700;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  > button {
    width: 100px;
  }
`;

const StatusFilterWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  > span {
    font-weight: 600;
  }
`;

import styled from 'styled-components';

import { Tab, Tabs } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import { SlidersIcon } from '../atoms/Icons';

interface IProps {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MainTab(props: IProps) {
  const { currentTab, setCurrentTab, setIsFilterOpen } = props;

  const handleTabChange = (e: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const toggleFilter = () => {
    setIsFilterOpen((prev: boolean) => !prev);
  };

  return (
    <TabContainer>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab value='' label='전체' />
        <Tab value='프로젝트' label='프로젝트' />
        <Tab value='스터디' label='스터디' />
      </Tabs>
      <SlidersIcon width={18} onClick={toggleFilter} />
    </TabContainer>
  );
}

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
`;

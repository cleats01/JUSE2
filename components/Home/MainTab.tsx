import styled from 'styled-components';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import { Badge, Tab, Tabs } from '@mui/material';
import { SlidersIcon } from 'components/Common/Icons';
import ButtonIcon from '@stories/atoms/ButtonIcon';

interface IProps {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  filterCount: number;
}

export default function MainTab(props: IProps) {
  const { currentTab, setCurrentTab, setIsFilterOpen, filterCount } = props;

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
      <ButtonIcon onClick={toggleFilter}>
        <Badge badgeContent={filterCount} color='primary'>
          <SlidersIcon width={18} />
        </Badge>
      </ButtonIcon>
    </TabContainer>
  );
}

const TabContainer = styled.div`
  position: sticky;
  top: 55px;
  background-color: #fff;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

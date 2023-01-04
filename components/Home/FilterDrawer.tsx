import styled from 'styled-components';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import TechStack from 'components/TechStack';

interface IProps {
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  isClosed: boolean;
  setIsClosed: Dispatch<SetStateAction<boolean>>;
  place: string;
  setPlace: Dispatch<SetStateAction<string>>;
  period: number[];
  setPeriod: Dispatch<SetStateAction<number[]>>;
  offline: string;
  setOffline: Dispatch<SetStateAction<string>>;
  techStack: string[];
  setTechStack: Dispatch<SetStateAction<string[]>>;
}

export default function FilterDrawer(props: IProps) {
  const {
    isFilterOpen,
    setIsFilterOpen,
    isClosed,
    setIsClosed,
    place,
    setPlace,
    period,
    setPeriod,
    offline,
    setOffline,
    techStack,
    setTechStack,
  } = props;

  // 필터 Drawer 열고닫기
  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  // 장소 필터 설정
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
    if (newPlace === '온라인') {
      setOffline('');
    }
    setPlace(newPlace);
  };
  const handleOffline = (event: SelectChangeEvent) => {
    setOffline(event.target.value as string);
  };

  // 기간 필터 설정
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

  // 필터 초기화
  const resetFilter = () => {
    setIsClosed(false);
    setOffline('');
    setPlace('');
    setPeriod([1, 6]);
    setTechStack([]);
  };

  return (
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
                <FormControl size='small' sx={{ width: '100%' }}>
                  <InputLabel>지역</InputLabel>
                  <Select value={offline} label='지역' onChange={handleOffline}>
                    {offlinePlace.map((el: string) => (
                      <MenuItem value={el} key={el}>
                        {el}
                      </MenuItem>
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
          <Box sx={{ padding: '0 20px', minWidth: '250px', maxWidth: '350px' }}>
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
  );
}

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

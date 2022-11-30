import React, { useState } from 'react';
import styled from 'styled-components';
import NavbarNew from '../../components/NavbarNew';

import PlusIcon from '../../public/icons/plus-circle.svg';
import MinusIcon from '../../public/icons/minus-circle.svg';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';

export default function Add() {
  const [type, setType] = useState<string>('project');
  const [place, setPlace] = useState<string>('online');
  const [contact, setContact] = useState<string>('');
  const [offline, setOffline] = useState<string>('');
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
  const [period, setPeriod] = useState<string>('');
  const periods: string[] = [
    '1개월 이하',
    '2개월',
    '3개월',
    '4개월',
    '5개월',
    '6개월 이상',
  ];
  const [position, setPosition] = useState<
    { position: string; count: number }[]
  >([{ position: '', count: 0 }]);
  const positions: string[] = ['프론트엔드', '백엔드', '모바일', '기타'];
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleType = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    if (newType !== null) {
      setType(newType);
    }
  };

  const handlePlace = (
    event: React.MouseEvent<HTMLElement>,
    newPlace: string
  ) => {
    if (newPlace !== null) {
      setPlace(newPlace);
    }
  };

  const handleOffline = (event: SelectChangeEvent) => {
    setOffline(event.target.value as string);
  };

  const handleContact = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact(event.target.value as string);
  };

  const handlePeriod = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as string);
  };

  const handlePosition = (event: SelectChangeEvent, positionName: string) => {
    if (
      position.findIndex((obj) => obj.position === event.target.value) === -1
    ) {
      const newPosition = position.map((obj) => {
        return obj.position === positionName
          ? { position: event.target.value as string, count: 0 }
          : obj;
      });
      setPosition(newPosition);
    }
  };

  const handleCount = (
    event: React.MouseEvent<HTMLButtonElement>,
    positionName: string
  ) => {
    if (event.currentTarget.id === 'minus') {
      setPosition(
        position.map((obj) => {
          return obj.position === positionName && obj.count > 0
            ? { position: obj.position, count: obj.count - 1 }
            : obj;
        })
      );
    } else {
      setPosition(
        position.map((obj) => {
          return obj.position === positionName
            ? { position: obj.position, count: obj.count + 1 }
            : obj;
        })
      );
    }
  };

  const addPosition = () => {
    if (
      position.findIndex((obj) => obj.position === '') === -1 &&
      position.length < 4
    ) {
      setPosition((prev) => [...prev, { position: '', count: 0 }]);
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value as string);
  };

  const handleContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value as string);
  };

  return (
    <AddLayout>
      <NavbarNew
        formData={{
          type,
          place: place === 'online' ? place : offline,
          contact,
          period,
          position,
          title,
          content,
        }}
      />
      <FormContainer>
        <InputWrapper>
          <ToggleButtonGroup
            size='small'
            value={type}
            exclusive
            onChange={handleType}>
            <ToggleButton value='project'>프로젝트</ToggleButton>
            <ToggleButton value='study'>스터디</ToggleButton>
          </ToggleButtonGroup>
        </InputWrapper>
        <InputWrapper>
          <ToggleButtonGroup
            size='small'
            value={place}
            exclusive
            onChange={handlePlace}>
            <ToggleButton value='online'>온라인</ToggleButton>
            <ToggleButton value='offline'>오프라인</ToggleButton>
            {place === 'offline' ? (
              <Box sx={{ minWidth: 90, marginLeft: '10px' }}>
                <FormControl size='small' fullWidth>
                  <InputLabel>지역</InputLabel>
                  <Select value={offline} label='지역' onChange={handleOffline}>
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
        </InputWrapper>
        <InputWrapper>
          <TextField
            value={contact}
            onChange={handleContact}
            label='연락 방법'
            size='small'
          />
        </InputWrapper>
        <InputWrapper>
          <Box>
            <FormControl size='small' fullWidth>
              <InputLabel>진행 기간</InputLabel>
              <Select label='진행 기간' value={period} onChange={handlePeriod}>
                {periods.map((el: string) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </InputWrapper>
        <InputWrapper>
          {position.map((el) => (
            <Box sx={{ minWidth: 150 }}>
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                size='small'>
                <InputLabel>모집 포지션</InputLabel>
                <Select
                  sx={{
                    minWidth: 120,
                  }}
                  value={el.position}
                  onChange={(event) => {
                    handlePosition(event, el.position);
                  }}
                  label='모집 포지션'>
                  {positions.map((el: string) => (
                    <MenuItem value={el}>{el}</MenuItem>
                  ))}
                </Select>
                <CountWrapper>
                  <button
                    id='minus'
                    type={'button'}
                    onClick={(event) => {
                      handleCount(event, el.position);
                    }}>
                    <MinusIcon />
                  </button>
                  <span>{el.count} 명</span>
                  <button
                    id='plus'
                    type={'button'}
                    onClick={(event) => {
                      handleCount(event, el.position);
                    }}>
                    <PlusIcon />
                  </button>
                </CountWrapper>
              </FormControl>
            </Box>
          ))}
          <PositionAddButton onClick={addPosition}>
            포지션 추가
          </PositionAddButton>
        </InputWrapper>
      </FormContainer>
      <ContentsContainer>
        <TextField
          label='제목'
          value={title}
          onChange={handleTitle}
          variant='filled'
          fullWidth
        />
        <TextField
          label='본문'
          value={content}
          onChange={handleContent}
          multiline
          minRows={4}
          variant='filled'
        />
      </ContentsContainer>
    </AddLayout>
  );
}

const AddLayout = styled.div`
  padding: 70px 16px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 20px;
  padding: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 700;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  > span {
    min-width: 30px;
  }
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PositionAddButton = styled.button`
  background-color: ${({ theme }) => theme.colors.grey1};
  border-radius: 4px;
  padding: 5px;
`;

const ContentsContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 5px;
`;

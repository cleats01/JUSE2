import React, { useState } from 'react';
import styled from 'styled-components';
import NavbarNew from '../../components/NavbarNew';
import TechStack from '../../components/TechStack';

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
import { useSession } from 'next-auth/react';
import BottomSheet from '../../components/BottomSheet';
import { position } from '@prisma/client';

import TextEditor from '../../components/TextEditor';

export default function Add() {
  const { data: session, status } = useSession();
  const [type, setType] = useState<string>('프로젝트');
  const [place, setPlace] = useState<string>('온라인');
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
  const [application, setApplication] = useState<position[]>([
    { position: '', count: 0, accept: [], pending: [], reject: [] },
  ]);
  const positions: string[] = ['프론트엔드', '백엔드', '모바일', '기타'];
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handlePeriod = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as string);
  };

  const handleApplication = (
    event: SelectChangeEvent,
    positionName: string
  ) => {
    if (event.target.value === '삭제' && application.length > 1) {
      const index = application.findIndex(
        (obj) => obj.position === positionName
      );
      const deleted = application.splice(index, 1);
      setApplication(deleted);
    }
    if (
      application.findIndex((obj) => obj.position === event.target.value) === -1
    ) {
      const newPosition = application.map((obj) => {
        return obj.position === positionName
          ? {
              position: event.target.value as string,
              count: 0,
              accept: [],
              pending: [],
              reject: [],
            }
          : obj;
      });
      setApplication(newPosition);
    }
  };

  const handleCount = (
    event: React.MouseEvent<HTMLButtonElement>,
    positionName: string
  ) => {
    if (event.currentTarget.id === 'minus') {
      setApplication(
        application.map((obj) => {
          return obj.position === positionName && obj.count > 0
            ? {
                position: obj.position,
                count: obj.count - 1,
                accept: [],
                pending: [],
                reject: [],
              }
            : obj;
        })
      );
    } else {
      setApplication(
        application.map((obj) => {
          return obj.position === positionName
            ? {
                position: obj.position,
                count: obj.count + 1,
                accept: [],
                pending: [],
                reject: [],
              }
            : obj;
        })
      );
    }
  };

  const addPosition = () => {
    if (
      application.findIndex((obj) => obj.position === '') === -1 &&
      application.length < 4
    ) {
      setApplication((prev) => [
        ...prev,
        { position: '', count: 0, accept: [], pending: [], reject: [] },
      ]);
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
          place: place === '온라인' ? place : offline,
          period,
          application,
          title,
          content,
          authorId: session?.user.id,
          user: session?.user,
          techStack,
        }}
      />
      <FormContainer>
        <InputWrapper>
          <ToggleButtonGroup
            size='small'
            value={type}
            exclusive
            color='primary'
            onChange={handleType}>
            <ToggleButton value='프로젝트'>프로젝트</ToggleButton>
            <ToggleButton value='스터디'>스터디</ToggleButton>
          </ToggleButtonGroup>
        </InputWrapper>
        <InputWrapper>
          <ToggleButtonGroup
            size='small'
            value={place}
            color='primary'
            exclusive
            onChange={handlePlace}>
            <ToggleButton value='온라인'>온라인</ToggleButton>
            <ToggleButton value='오프라인'>오프라인</ToggleButton>
            {place === '오프라인' ? (
              <Box sx={{ minWidth: 90, marginLeft: '10px' }}>
                <FormControl size='small' fullWidth>
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
        </InputWrapper>
        <InputWrapper>
          <Box>
            <FormControl size='small' fullWidth>
              <InputLabel>진행 기간</InputLabel>
              <Select label='진행 기간' value={period} onChange={handlePeriod}>
                {periods.map((el: string) => (
                  <MenuItem value={el} key={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </InputWrapper>
        <InputWrapper>
          {application.map((el) => (
            <Box sx={{ minWidth: 150 }} key={el.position}>
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
                    handleApplication(event, el.position);
                  }}
                  label='모집 포지션'>
                  {positions.map((el: string) => (
                    <MenuItem
                      value={el}
                      key={el}
                      disabled={
                        application.findIndex(
                          (position) => position.position === el
                        ) !== -1
                      }>
                      {el}
                    </MenuItem>
                  ))}
                  {application.length > 1 ? (
                    <MenuItem
                      value={'삭제'}
                      key={'삭제'}
                      style={{ color: 'tomato' }}>
                      삭제
                    </MenuItem>
                  ) : (
                    ''
                  )}
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
        <InputWrapper>
          {isModalOpen ? (
            <BottomSheet setIsOpen={setIsModalOpen}>
              <BottomSheetHeader>
                사용 기술 스택
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                  }}>
                  완료
                </button>
              </BottomSheetHeader>
              <TechStack selected={techStack} setSelected={setTechStack} />
            </BottomSheet>
          ) : (
            ''
          )}
          <StackAddButton onClick={() => setIsModalOpen((prev) => !prev)}>
            {techStack.length
              ? techStack.map((stack) => (
                  <StackBubble src={`/icons/stacks/${stack}.png`} key={stack} />
                ))
              : '기술 스택 추가'}
          </StackAddButton>
        </InputWrapper>
      </FormContainer>
      <ContentsContainer>
        <TextField
          label='제목'
          value={title}
          onChange={handleTitle}
          variant='outlined'
          fullWidth
        />
        <TextEditor content={content} setContent={setContent} />
      </ContentsContainer>
    </AddLayout>
  );
}

const AddLayout = styled.div`
  padding: 70px 16px;
  animation: bottomShow 0.3s linear;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 20px;
  padding: 20px;
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
  padding: 8px;
`;

const ContentsContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 5px;
`;

export const StackAddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 5px;
  padding: 10px;
`;

export const StackBubble = styled.img`
  width: 30px;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 999px;
`;

export const BottomSheetHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: 700;
`;

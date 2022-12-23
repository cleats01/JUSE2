import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { boardData } from '../pages';
import CloseBtnIcon from '../public/icons/close.svg';
import Card from './Card';

export default function Trending({ data }: { data: boardData[] }) {
  return (
    <TrendingContainer>
      <TrendingHeader>현재 🔥한 게시물</TrendingHeader>
      <CardContainer>
        {data.map((board: boardData) => (
          <Card key={board.id} data={board} />
        ))}
      </CardContainer>
    </TrendingContainer>
  );
}

const TrendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TrendingHeader = styled.h1`
  font-weight: 700;
  font-size: 20px;
  padding-left: 10px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

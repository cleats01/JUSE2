import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';

import Card from 'components/Common/Card';

interface IProps {
  trending: boardData[];
}

export default function Trending({ trending }: IProps) {
  return (
    <TrendingContainer>
      <TrendingHeader>현재 🔥한 모임</TrendingHeader>
      <Swiper
        slidesPerView={1.15}
        spaceBetween={10}
        grabCursor
        modules={[Pagination]}
        style={{ width: '100%' }}>
        {trending.map((board: boardData) => (
          <SwiperSlide key={board.id}>
            <Card data={board} />
          </SwiperSlide>
        ))}
      </Swiper>
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

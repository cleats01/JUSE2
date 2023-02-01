import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper';
import { ReactNode } from 'react';

export interface ICarouselProps {
  slides: ReactNode[];
  delay?: number;
}

export default function Carousel({ slides, delay }: ICarouselProps) {
  return (
    <CarouselContainer>
      <Swiper
        loop
        autoplay={{ delay: delay || 3000, disableOnInteraction: false }}
        pagination
        modules={[Pagination, Autoplay]}>
        {slides.map((children: ReactNode, index: number) => (
          <SwiperSlide key={index}>
            <SlideContainer>{children}</SlideContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </CarouselContainer>
  );
}

const CarouselContainer = styled.div`
  .swiper-pagination-bullet {
    background-color: ${({ theme }) => theme.colors.grey5};
  }
  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.colors.purple1};
  }
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 480 / 150;
`;

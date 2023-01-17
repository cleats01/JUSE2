import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper';
import Image from 'next/image';

interface IProps {}

export default function Carousel(props: IProps) {
  return (
    <CarouselContainer>
      <Swiper
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination
        modules={[Pagination, Autoplay]}>
        <SwiperSlide>
          <SlideContainer>
            <Image src={'/slide1.png'} alt={'slide1'} fill />
          </SlideContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SlideContainer>
            <Image src={'/slide2.png'} alt={'slide2'} fill />
          </SlideContainer>
        </SwiperSlide>
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
  width: 100%;
  aspect-ratio: 480 / 150;
`;

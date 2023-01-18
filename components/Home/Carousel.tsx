import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper';
import Image from 'next/image';

import { Box, Button, Modal, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { postReport } from 'utils/axios';

export default function Carousel() {
  const [reportContent, setReportContent] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleReportClick = () => {
    handleOpen();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReportContent(event.target.value);
  };

  const submitReport = () => {
    if (reportContent.length < 1) {
      alert('내용을 입력해주세요.');
      return;
    }
    const data = { content: reportContent };
    postReport(data).then(() => {
      alert('평가해주셔서 감사합니다.');
      handleClose();
    });
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '90%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '15px',
    p: '30px',
    outline: 0,
  };

  return (
    <CarouselContainer>
      <Swiper
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination
        modules={[Pagination, Autoplay]}>
        <SwiperSlide>
          <SlideContainer>
            <Image src={'/slide1.png'} alt={'slide1'} fill priority />
          </SlideContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SlideContainer>
            <Image
              style={{ cursor: 'pointer' }}
              src={'/slide2.png'}
              alt={'slide2'}
              fill
              priority
              onClick={handleReportClick}
            />
          </SlideContainer>
        </SwiperSlide>
      </Swiper>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <p>더 나은 JUSE를 위해 의견을 말해주세요.</p>
          <p>내용은 익명으로 제출됩니다.</p>
          <InputWrapper>
            <TextField
              label='내용을 입력하세요.'
              variant='outlined'
              size='small'
              fullWidth
              onChange={handleInputChange}
            />
            <Button
              sx={{ height: '100%', color: '#fff' }}
              variant='contained'
              size='small'
              disableElevation
              onClick={submitReport}>
              제출
            </Button>
          </InputWrapper>
        </Box>
      </Modal>
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

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
  height: 40px;
`;

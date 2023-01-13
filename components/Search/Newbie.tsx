import styled from 'styled-components';
import { User } from '@prisma/client';
import UserInfo from 'components/User/UserInfo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

interface IProps {
  users: User[];
}

export default function Newbie({ users }: IProps) {
  return (
    <NewbieContainer>
      <NewbieHeader>새로 가입했어요!</NewbieHeader>
      <Swiper
        slidesPerView={1.15}
        spaceBetween={10}
        grabCursor
        modules={[Pagination]}
        style={{ width: '100%' }}>
        {users.map((user: User) => (
          <SwiperSlide key={user.id}>
            <UserCard>
              <Link href={`/user/${user.id}`}>
                <UserInfo user={user} />
              </Link>
            </UserCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </NewbieContainer>
  );
}

const NewbieContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NewbieHeader = styled.h1`
  font-weight: 700;
  font-size: 20px;
  padding-left: 10px;
`;

const UserCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 10px;
`;

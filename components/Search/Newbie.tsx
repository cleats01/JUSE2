import styled from 'styled-components';
import { User } from '@prisma/client';
import UserInfo from 'components/User/UserInfo';

interface IProps {
  users: User[];
}

export default function Newbie({ users }: IProps) {
  return (
    <NewbieContainer>
      <NewbieHeader>새로 가입했어요!</NewbieHeader>
      <CardContainer>
        {users.map((user: User) => (
          <CardOverflow key={user.id}>
            <UserInfo user={user} />
          </CardOverflow>
        ))}
      </CardContainer>
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

const CardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  /* 스크롤 바 없애기 */
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CardOverflow = styled.div`
  flex: 0 0 85%;
  scroll-snap-align: start;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 10px;
`;

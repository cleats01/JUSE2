import styled from 'styled-components';
import Link from 'next/link';
import theme from 'styles/theme';
import moment from 'moment';
import 'moment/locale/ko';

import { BookmarkIcon, ChatIcon } from 'components/Common/Icons';
import StackLogo from 'components/Common/StackLogo';
import Chip from '@stories/atoms/Chip';

interface IProps {
  data: boardData;
}

export default function Card(props: IProps) {
  const {
    id,
    type,
    place,
    title,
    techStack,
    application,
    bookmark,
    chat,
    isClosed,
    createdAt,
  } = props.data;

  return (
    <CardLayout isClosed={isClosed}>
      <Link href={`/board/${id}`}>
        {isClosed ? <Closed>모집 마감</Closed> : ''}
        <CardHeader>
          <Chip
            color={
              type === '프로젝트'
                ? theme.colors.purple1
                : theme.colors.tiffanyblue
            }>
            {type}
          </Chip>
          <Chip outlined>{place}</Chip>
          <CreatedAt>
            {moment(createdAt).year() === moment(Date.now()).year()
              ? moment(createdAt).format('M월 D일')
              : moment(createdAt).format('LL')}
          </CreatedAt>
        </CardHeader>
        <Title>{title}</Title>
        <TechStackWrapper>
          {techStack.map((stack, index) => (
            <StackLogo key={index} stack={stack.toLowerCase()} zoom={0.6} />
          ))}
        </TechStackWrapper>
      </Link>
      <CardFooter>
        <span>
          모집 현황{' '}
          {application.reduce((acc, cur) => {
            return acc + cur.accept.length;
          }, 0)}{' '}
          /{' '}
          {application.reduce((acc, cur) => {
            return acc + cur.count;
          }, 0)}
        </span>
        <IconWrapper>
          <ChatIcon width={12} fill={theme.colors.grey5} />
          {chat}
          <BookmarkIcon width={12} fill={theme.colors.grey5} />
          {bookmark}
        </IconWrapper>
      </CardFooter>
    </CardLayout>
  );
}

const CardLayout = styled.div<{ isClosed: boolean }>`
  position: relative;
  > a {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  padding: 10px 15px;
  opacity: ${({ isClosed }) => (isClosed ? 0.7 : 1)};
  width: 100%;
`;

const CardHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Badge = styled.div`
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.grey4};
  &.스터디 {
    background-color: ${({ theme }) => theme.colors.tiffanyblue};
  }
  &.프로젝트 {
    background-color: ${({ theme }) => theme.colors.purple1};
  }
`;

const CreatedAt = styled.div`
  color: ${({ theme }) => theme.colors.grey4};
  font-size: 14px;
  margin-left: auto;
`;

const Title = styled.h1`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.4;
  -webkit-line-clamp: 2;
  font-weight: 700;
`;

const TechStackWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 30px;
`;

const CardFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0 5px 0;
  color: ${({ theme }) => theme.colors.grey4};
  font-size: 14px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.grey4};
  fill: ${({ theme }) => theme.colors.grey4};
`;

const Closed = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  background-color: #000;
  color: #fff;
`;

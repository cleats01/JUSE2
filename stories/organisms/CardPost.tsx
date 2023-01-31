import styled from 'styled-components';
import theme from 'styles/theme';
import moment from 'moment';
import 'moment/locale/ko';

import { BookmarkIcon, ChatIcon } from 'components/Common/Icons';
import Chip from '@stories/atoms/Chip';
import StackBubble from '@stories/atoms/StackBubble';
import FlexWrapper from '@stories/atoms/FlexWrapper';
import { position } from '@prisma/client';

export interface ICardPostProps {
  type: '프로젝트' | '스터디';
  place: string;
  title: string;
  techStack: string[];
  application: position[];
  bookmark: number;
  chat: number;
  isClosed: boolean;
  createdAt: Date;
}

export default function CardPost(props: ICardPostProps) {
  const {
    type,
    place,
    title,
    techStack,
    application,
    bookmark,
    chat,
    isClosed,
    createdAt,
  } = props;

  return (
    <CardLayout isClosed={isClosed}>
      {isClosed ? <Closed>모집 마감</Closed> : ''}
      <FlexWrapper center>
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
      </FlexWrapper>
      <Title>{title}</Title>
      <TechStackWrapper>
        {techStack.map((stack, index) => (
          <StackBubble key={index} stack={stack.toLowerCase()} zoom={0.6} />
        ))}
      </TechStackWrapper>
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
        <IconWrapper gap={5} center>
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  padding: 10px 15px;
  opacity: ${({ isClosed }) => (isClosed ? 0.7 : 1)};
  width: 100%;
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

const TechStackWrapper = styled(FlexWrapper)`
  justify-content: flex-start;
  flex-wrap: wrap;
  min-height: 30px;
`;

const CardFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  color: ${({ theme }) => theme.colors.grey4};
  font-size: 14px;
`;

const IconWrapper = styled(FlexWrapper)`
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

import styled from 'styled-components';
import Link from 'next/link';
import { User } from '@prisma/client';

import UserImgWrapper from 'components/Common/UserImgWrapper';
import { HeartFilledIcon } from 'components/Common/Icons';
import { InfoLabel, InfoWrapper } from 'components/Board/BoardPage';
import StackLogo from 'components/Common/StackLogo';

interface IProps {
  author: User;
}

export default function LeaderInfo(props: IProps) {
  const { author } = props;

  return (
    <InfoWrapper className='column'>
      <InfoLabel>팀장 정보</InfoLabel>
      <Link href={`/user/${author.id}`}>
        <LeaderInfoContainer>
          <UserImgWrapper size={'45px'}>
            <img src={author.image} alt={'user-image'} />
          </UserImgWrapper>
          <LeaderNickname>
            <span className='nickname'>{author.nickname}</span>
            <span className='likes'>
              <HeartFilledIcon width={'15px'} fill={'tomato'} />
              {author.like}
            </span>
          </LeaderNickname>
          <LeaderTechStack>
            {author.userTechStack?.map((stack) => (
              <StackLogo key={stack} stack={stack.toLowerCase()} zoom={0.6} />
            ))}
          </LeaderTechStack>
        </LeaderInfoContainer>
      </Link>
    </InfoWrapper>
  );
}

const LeaderInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LeaderNickname = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  > .nickname {
    font-size: 14px;
    font-weight: 700;
  }
  > .likes {
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${({ theme }) => theme.colors.grey4};
    font-size: 12px;
  }
`;

const StackWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const LeaderTechStack = styled(StackWrapper)`
  margin-left: auto;
`;

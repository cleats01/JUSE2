import styled from 'styled-components';
import { User } from '@prisma/client';
import Image from 'next/image';

import UserImgWrapper from 'components/Common/UserImgWrapper';
import { StackBubble } from 'components/Common/TechStackSelector';
import { HeartFilledIcon } from 'components/Common/Icons';

interface IProps {
  user: User;
}

export default function UserInfo(props: IProps) {
  const { image, nickname, like, userTechStack } = props.user;

  return (
    <UserInfoContainer>
      <ProfileWrapper>
        <UserImgWrapper size='50px'>
          <Image
            src={image}
            alt='user-image'
            width={50}
            height={50}
            sizes='50px'
            priority
          />
        </UserImgWrapper>
        <span>{nickname}</span>
        <LikeWrapper>
          <HeartFilledIcon fill={'tomato'} />
          <span>{like}</span>
        </LikeWrapper>
      </ProfileWrapper>
      <TechStackContainer>
        {userTechStack.map((stack) => (
          <StackBubble
            key={stack}
            src={`/icons/stacks/${stack}.png`}
            alt={stack}
            width={35}
            height={35}
            sizes={'35px'}
            priority
          />
        ))}
      </TechStackContainer>
    </UserInfoContainer>
  );
}

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 16px;
  &.border {
    padding: 16px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.grey2};
  }
`;

const TechStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  > img {
    width: 35px;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  > span {
    font-weight: 700;
  }
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  > span {
    font-size: 18px;
    width: 22px;
  }
`;

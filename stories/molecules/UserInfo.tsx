import styled from 'styled-components';

import { HeartFilledIcon } from 'components/Common/Icons';
import UserImage from '@stories/atoms/UserImage';
import Label from '@stories/atoms/Label';
import StackBubble from '@stories/atoms/StackBubble';

export interface IUserInfoProps {
  image: string;
  nickname: string;
  like: number;
  userTechStack: string[];
}

export default function UserInfo(props: IUserInfoProps) {
  const { image, nickname, like, userTechStack } = props;

  return (
    <UserInfoContainer>
      <ProfileWrapper>
        <UserImage size={50} imgSrc={image} />
        <Label>{nickname}</Label>
        <LikeWrapper>
          <HeartFilledIcon fill={'tomato'} />
          <span>{like}</span>
        </LikeWrapper>
      </ProfileWrapper>
      <TechStackContainer>
        {userTechStack.map((stack) => (
          <StackBubble key={stack} stack={stack.toLowerCase()} zoom={0.7} />
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
  min-height: 35px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
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

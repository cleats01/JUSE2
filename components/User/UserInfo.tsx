import styled from 'styled-components';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import { Button } from '@mui/material';
import UserImgWrapper from 'components/Common/UserImgWrapper';
import { StackBubble } from 'components/New/FormInput';
import { HeartFilledIcon } from 'components/Common/Icons';

interface IProps {
  user: User;
}

export default function UserInfo(props: IProps) {
  const { image, nickname, like, userTechStack } = props.user;
  const router = useRouter();

  const signOutHandler = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <UserInfoContainer>
      <ProfileWrapper>
        <UserImgWrapper size='50px'>
          <img src={image} alt='user-image' />
        </UserImgWrapper>
        <span>{nickname}</span>
        <LikeWrapper>
          <HeartFilledIcon fill={'tomato'} />
          <span>{like}</span>
        </LikeWrapper>
      </ProfileWrapper>
      <TechStackContainer>
        {userTechStack.map((stack) => (
          <StackBubble key={stack} src={`/icons/stacks/${stack}.png`} />
        ))}
      </TechStackContainer>
      <ButtonWrapper>
        <Button
          onClick={() => {
            router.push('/user/edit');
          }}
          variant='outlined'
          size='small'>
          정보 수정
        </Button>
        <Button
          variant='contained'
          disableElevation
          size='small'
          style={{ color: '#fff' }}
          onClick={signOutHandler}>
          로그아웃
        </Button>
      </ButtonWrapper>
    </UserInfoContainer>
  );
}

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 16px;
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
  margin-right: 10px;
  > span {
    font-size: 18px;
    width: 22px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  > button {
    flex-grow: 1;
  }
`;

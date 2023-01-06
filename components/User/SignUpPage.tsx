import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { handleUserSubmit } from 'utils/functions';

import { Button } from '@mui/material';
import UserImgUploader from 'components/User/UserImgUploader';
import UserNicknameInput from 'components/User/UserNicknameInput';
import TechStackSelector from 'components/Common/TechStackSelector';

export default function SignUpPage() {
  const [nickname, setNickname] = useState<string>('');
  const [nicknameCheck, setNicknameCheck] = useState('');
  const [userTechStack, setUserTechStack] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();
  const email = router.query.signup?.[0];

  const handleSubmit = async () => {
    const data = {
      email,
      nickname,
      userTechStack,
      image: imageURL
        ? 'https://juse-user-image.s3.ap-northeast-2.amazonaws.com/' + imageURL
        : '/user-default.png',
    };
    await handleUserSubmit(imageURL, imageFile, nicknameCheck, data).then(
      () => {
        router.push('/login');
      }
    );
  };

  const userNicknameInputProps = {
    nickname,
    setNickname,
    nicknameCheck,
    setNicknameCheck,
  };

  const techStackSelectorProps = {
    techStack: userTechStack,
    setTechStack: setUserTechStack,
  };

  return (
    <SignUpLayout>
      <Welcome>
        <span>JUSE</span>에 처음 오셨군요?
      </Welcome>
      <UserImgUploader setImageFile={setImageFile} setImageURL={setImageURL} />
      <UserNicknameInput {...userNicknameInputProps} />
      <TechStackSelector {...techStackSelectorProps} />
      <ButtonWrapper>
        <Button
          variant='outlined'
          onClick={() => {
            router.replace('/login');
          }}
          disableElevation>
          취소
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit}
          style={{ color: '#fff' }}
          disableElevation>
          등록
        </Button>
      </ButtonWrapper>
    </SignUpLayout>
  );
}

const SignUpLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 300px;
  min-height: 100vh;
  margin: auto;
`;

const Welcome = styled.h1`
  font-size: 20px;
  > span {
    font-weight: 900;
    color: ${({ theme }) => theme.colors.purple1};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { deleteUser, getUserById, patchUser } from 'utils/axios';
import { handleUserSubmit } from 'utils/functions';

import { Button } from '@mui/material';
import NavbarTextOnly from 'components/Common/NavbarTextOnly';
import UserImgUploader from 'components/User/UserImgUploader';
import UserNicknameInput from 'components/User/UserNicknameInput';
import TechStackSelector from 'components/Common/TechStackSelector';

export default function UserEditPage() {
  const { data: session, status } = useSession();
  const [nickname, setNickname] = useState<string>('');
  const [nicknameCheck, setNicknameCheck] =
    useState<string>('사용가능한 닉네임입니다.');
  const [userTechStack, setUserTechStack] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string>('');
  const [imageEdit, setImageEdit] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();

  const handleSubmit = async () => {
    const data = {
      id: session?.user.id,
      nickname,
      userTechStack,
      image: imageURL
        ? 'https://juse-user-image.s3.ap-northeast-2.amazonaws.com/' + imageURL
        : '/user-default.png',
    };
    await handleUserSubmit(imageURL, imageFile, nicknameCheck, data).then(
      () => {
        router.push('/user');
      }
    );
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getUserById(session.user.id).then((data) => {
        const { nickname, image, userTechStack } = data;
        setNickname(nickname);
        setImageEdit(image);
        if (image !== '/user-default.png') {
          setImageURL(
            image.replace(
              'https://juse-user-image.s3.ap-northeast-2.amazonaws.com/',
              ''
            )
          );
        }
        setUserTechStack(userTechStack);
      });
    }
  }, [session]);

  const handleWithdrawal = () => {
    if (confirm('정말 회원 탈퇴하시겠습니까?')) {
      deleteUser(session?.user.id).then(() => {
        alert('JUSE 회원에서 탈퇴되었습니다.');
        router.replace('/login');
      });
    }
  };

  const userImgUploaderProps = {
    imageEdit,
    setImageEdit,
    setImageFile,
    setImageURL,
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
      <NavbarTextOnly centerText='회원정보 수정' back={true} />
      <UserImgUploader {...userImgUploaderProps} />
      <UserNicknameInput {...userNicknameInputProps} />
      <TechStackSelector {...techStackSelectorProps} />
      <ButtonWrapper>
        <Button
          variant='outlined'
          onClick={handleWithdrawal}
          style={{ width: '90px' }}
          disableElevation>
          회원 탈퇴
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit}
          style={{ color: '#fff', width: '90px' }}
          disableElevation>
          수정
        </Button>
      </ButtonWrapper>
    </SignUpLayout>
  );
}

const SignUpLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  margin: auto;
  padding: 20px;
  height: 100vh;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { deleteUser, getUserById, patchUser } from 'utils/axios';

import { Button } from '@mui/material';
import BottomSheet from 'components/BottomSheet';
import TechStack from 'components/TechStack';
import NavbarTextOnly from 'components/NavbarTextOnly';
import UserImgUploader from 'components/User/UserImgUploader';
import UserNicknameInput from 'components/User/UserNicknameInput';
import {
  StackAddButton,
  BottomSheetHeader,
  StackBubble,
} from 'components/New/FormInput';

export default function UserEditPage() {
  const { data: session, status } = useSession();
  const [nickname, setNickname] = useState<string>('');
  const [nicknameCheck, setNicknameCheck] =
    useState<string>('사용가능한 닉네임입니다.');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userTechStack, setUserTechStack] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string>('');
  const [imageEdit, setImageEdit] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();

  const handleSubmit = async () => {
    if (nicknameCheck !== '사용가능한 닉네임입니다.') {
      alert('닉네임을 확인해주세요.');
    } else {
      if (imageURL && imageFile) {
        // s3에 업로드
        await uploadImg();
      }
      const data = {
        id: session?.user.id as string,
        nickname,
        userTechStack,
        image: imageURL
          ? 'https://juse-user-image.s3.ap-northeast-2.amazonaws.com/' +
            imageURL
          : '/user-default.png',
      };
      await patchUser(data).then(() => {
        alert('회원 정보가 수정되었습니다.');
        router.push('/user');
      });
    }
  };

  const uploadImg = async () => {
    const imageBody = {
      name: imageURL,
      type: imageFile?.type,
    };
    try {
      const signedUrl = await axios
        .post(`/api/media`, imageBody)
        .then((res) => res.data.url);
      await axios.put(signedUrl, imageFile, {
        headers: { 'Content-type': imageFile?.type },
      });
    } catch (err) {
      console.log(err);
    }
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

  const UserNicknameInputProps = {
    nickname,
    setNickname,
    nicknameCheck,
    setNicknameCheck,
  };

  return (
    <SignUpLayout>
      <NavbarTextOnly centerText='회원정보 수정' back={true} />
      <UserImgUploader {...userImgUploaderProps} />
      <UserNicknameInput {...UserNicknameInputProps} />
      {isModalOpen ? (
        <BottomSheet setIsOpen={setIsModalOpen}>
          <BottomSheetHeader>
            사용 기술 스택
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}>
              완료
            </button>
          </BottomSheetHeader>
          <TechStack selected={userTechStack} setSelected={setUserTechStack} />
        </BottomSheet>
      ) : (
        ''
      )}
      <StackAddButton onClick={() => setIsModalOpen((prev) => !prev)}>
        {userTechStack.length
          ? userTechStack.map((stack) => (
              <StackBubble key={stack} src={`/icons/stacks/${stack}.png`} />
            ))
          : '기술 스택 추가'}
      </StackAddButton>
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

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import TabBar from '../../components/TabBar';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Welcome } from '../login';
import { Button, TextField } from '@mui/material';
import BottomSheet from '../../components/BottomSheet';
import TechStack from '../../components/TechStack';
import { StackAddButton, BottomSheetHeader, StackBubble } from '../add';
import { useSession } from 'next-auth/react';

export default function SignUp() {
  const { data: session, status } = useSession();
  const [nickname, setNickname] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userTechStack, setUserTechStack] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string>('');
  const [imageEdit, setImageEdit] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();
  const email = router.query.signup?.[0];

  const handleNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value as string);
  };

  const handleSubmit = async () => {
    const regex = /^[가-힣|a-z|A-Z|0-9|]+$/;
    if (nickname.length === 0) {
      alert('닉네임을 입력해주세요.');
    } else if (nickname.length < 2) {
      alert('닉네임은 2자 이상 입력해주세요.');
    } else if (nickname.length > 10) {
      alert('닉네임은 10자 이내로 입력해주세요.');
    } else if (!regex.test(nickname)) {
      alert('닉네임은 한글,영어,숫자만 가능합니다.');
    } else {
      if (imageURL && image) {
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
      await axios.patch('/api/users', data).then(() => {
        alert('회원 정보가 수정되었습니다.');
        router.push('/user');
      });
    }
  };

  // 화면 표시를 위한 임시 url
  const [createObjectURL, setCreateObjectURL] = useState('');

  // 화면 상단에 이미지 표시
  const uploadToClient = (e: ChangeEvent<HTMLInputElement>) => {
    if (createObjectURL) {
      URL.revokeObjectURL(createObjectURL);
    }
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      setImage(i);
      setImageURL(Math.random().toString(36).substring(2, 11));
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const deleteUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setImageEdit('');
    setImage(null);
    setImageURL('');
    setCreateObjectURL('');
  };

  const uploadImg = async () => {
    const imageBody = {
      name: imageURL,
      type: image?.type,
    };
    try {
      const signedUrl = await axios
        .post(`/api/media`, imageBody)
        .then((res) => res.data.url);
      await axios.put(signedUrl, image, {
        headers: { 'Content-type': image?.type },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      axios.get(`/api/users?id=${session?.user.id}`).then((res) => {
        const { id, nickname, image, userTechStack } = res.data;
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

  return (
    <SignUpLayout>
      <Welcome>회원 정보 수정</Welcome>
      <ImageUploadWrapper>
        <UserImgWrapper size={'100px'}>
          <img
            src={createObjectURL || imageEdit || '/user-default.png'}
            alt='user-image'
          />
        </UserImgWrapper>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          hidden
          onChange={uploadToClient}
        />
        <div>
          <Button
            onClick={() => {
              fileInputRef.current?.click();
            }}>
            업로드
          </Button>
          <Button onClick={deleteUpload}>삭제</Button>
        </div>
      </ImageUploadWrapper>
      <TextField
        sx={{ width: '100%' }}
        value={nickname}
        onChange={handleNickname}
        label='닉네임을 입력해 주세요.'
        size='small'
      />
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
              <StackBubble src={`/icons/stacks/${stack}.png`} />
            ))
          : '기술 스택 추가'}
      </StackAddButton>
      <ButtonWrapper>
        <Button
          variant='outlined'
          onClick={() => {
            router.replace('/user');
          }}
          disableElevation>
          취소
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit}
          style={{ color: '#fff' }}
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

const ImageUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const UserImgWrapper = styled.div<{ size: string }>`
  position: relative;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border: 1px solid #fff;
  border-radius: 999px;
  overflow: hidden;
  > img {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 999px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

import React, { ChangeEvent, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import TabBar from '../../../components/TabBar';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Welcome } from '../../login';
import { Button, TextField } from '@mui/material';
import BottomSheet from '../../../components/BottomSheet';
import TechStack from '../../../components/TechStack';
import { StackAddButton, BottomSheetHeader, StackBubble } from '../../add';
import aws from 'aws-sdk';

export default function SignUp() {
  const [nickname, setNickname] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userTechStack, setUserTechStack] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string>('');
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
      if (imageURL) {
        await uploadImgClient();
      }
      await axios
        .post('/api/users', {
          email,
          nickname,
          userTechStack,
          image: imageURL
            ? 'https://juse-user-image.s3.ap-northeast-2.amazonaws.com/' +
              imageURL
            : '/user-default.png',
        })
        .then(() => {
          alert('회원가입에 성공하였습니다. 다시 로그인하여 주십시오.');
          router.push('/login');
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

  const uploadImgClient = async () => {
    const imageBody = {
      name: imageURL,
      type: image?.type,
    };
    try {
      const signedUrl = await axios
        .post(`/api/media`, imageBody)
        .then((res) => res.data.url);
      const uploadRes = await axios.put(signedUrl, image, {
        headers: { 'Content-type': image?.type },
      });
      console.log(uploadRes);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SignUpLayout>
      <Welcome>
        <span>JUSE</span>에 처음 오셨군요?
      </Welcome>
      <UserImage src={createObjectURL || '/user-default.png'} alt='' />
      <input
        name='myImage'
        type='file'
        accept='image/*'
        onChange={uploadToClient}
      />
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
      <TabBar />
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
  height: 90vh;
  gap: 20px;
`;

const UserImage = styled.img`
  width: 200px;
  height: 200px;
  border: 1px solid #fff;
  border-radius: 999px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

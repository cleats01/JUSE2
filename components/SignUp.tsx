import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import TabBar from './TabBar';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [nickname, setNickname] = useState('');

  const { data } = useSession();

  return (
    <SignUpLayout>
      <h3>환영합니다.</h3>
      <input
        type='text'
        placeholder='닉네임을 입력해주세요.'
        onChange={(e) => {
          setNickname(e.target.value);
        }}
        value={nickname}
      />
      <button
        onClick={() => {
          axios
            .post('/api/sign-up', { email: data?.user?.email, nickname })
            .then(() => {
              signOut({ callbackUrl: '/login' });
            });
        }}>
        등록
      </button>
      <button
        onClick={() => {
          signOut({ callbackUrl: '/login' });
        }}>
        취소
      </button>
      <TabBar />
    </SignUpLayout>
  );
}

const SignUpLayout = styled.div``;

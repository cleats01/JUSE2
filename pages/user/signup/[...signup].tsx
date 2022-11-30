import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import TabBar from '../../../components/TabBar';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [nickname, setNickname] = useState('');

  const router = useRouter();
  const email = router.query.signup?.[0];

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
          axios.post('/api/user', { email, nickname }).then(() => {
            alert('회원가입에 성공하였습니다. 다시 로그인하여 주십시오.');
            router.push('/login');
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

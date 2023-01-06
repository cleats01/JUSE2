import React from 'react';
import styled from 'styled-components';
import { signIn } from 'next-auth/react';

import TabBar from 'components/Common/TabBar';
import { GoogleIcon } from 'components/Common/Icons';

export default function LoginPage() {
  return (
    <LoginPageLayout>
      <Welcome>
        <span>JUSE</span>에 오신 것을 환영합니다!
      </Welcome>
      <LoginButton
        onClick={() =>
          signIn('google', {
            callbackUrl: '/user',
          })
        }>
        <GoogleIcon width={20} />
        <span>Google 로그인</span>
      </LoginButton>
      <TabBar />
    </LoginPageLayout>
  );
}

const LoginPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  min-height: 100vh;
  position: relative;
`;

export const Welcome = styled.h1`
  font-size: 20px;
  margin-top: 40vh;
  > span {
    font-weight: 900;
    color: ${({ theme }) => theme.colors.purple1};
  }
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  padding: 10px 20px;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 10px;
`;

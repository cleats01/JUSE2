import React from 'react';
import { useSession } from 'next-auth/react';
import TabBar from '../components/TabBar';
import styled from 'styled-components';
import NavbarMain from '../components/NavbarMain';
import Card from '../components/Card';

export default function Home() {
  const { data, status } = useSession();
  return (
    <HomeLayout>
      <NavbarMain />
      <Card
        data={{
          type: '스터디',
          place: '온라인',
          title:
            '코딩테스트, 면접 스터디 모집합니다! 제목은 두 줄까지는 보여져야 합니다.',
          techStack: ['TypeScript', 'React', 'Nextjs', 'Nestjs'],
        }}
      />
      <Card
        data={{
          type: '프로젝트',
          place: '온라인',
          title:
            '코딩테스트, 면접 스터디 모집합니다! 제목은 두 줄까지는 보여져야 합니다.',
          techStack: ['TypeScript', 'React', 'Nextjs', 'Nestjs'],
        }}
      />
      <Card
        data={{
          type: '스터디',
          place: '서울',
          title:
            '코딩테스트, 면접 스터디 모집합니다! 제목은 두 줄까지는 보여져야 합니다.',
          techStack: ['TypeScript', 'React', 'Nextjs', 'Nestjs'],
        }}
      />
      <Card
        data={{
          type: '스터디',
          place: '온라인',
          title:
            '코딩테스트, 면접 스터디 모집합니다! 제목은 두 줄까지는 보여져야 합니다.',
          techStack: ['TypeScript', 'React', 'Nextjs', 'Nestjs'],
        }}
      />
      <TabBar />
    </HomeLayout>
  );
}

const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 70px 16px;
`;

import styled from 'styled-components';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { position } from '@prisma/client';

import FormInput from 'components/New/FormInput';
import ContentsInput from 'components/New/ContentsInput';
import NavbarNew from 'components/Common/NavbarNew';

export default function NewPage() {
  const { data: session, status } = useSession();
  const [type, setType] = useState<string>('프로젝트');
  const [place, setPlace] = useState<string>('온라인');
  const [offline, setOffline] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [application, setApplication] = useState<position[]>([
    { position: '', count: 0, accept: [], pending: [], reject: [] },
  ]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [techStack, setTechStack] = useState<string[]>([]);

  const formData = {
    type,
    place: place === '온라인' ? place : offline,
    period,
    application,
    title,
    content,
    authorId: session?.user.id,
    techStack,
  };

  const formInputProps = {
    type,
    setType,
    place,
    setPlace,
    offline,
    setOffline,
    period,
    setPeriod,
    application,
    setApplication,
    techStack,
    setTechStack,
  };

  const contentsInputProps = {
    title,
    setTitle,
    content,
    setContent,
  };

  return (
    <NewLayout>
      <NavbarNew formData={formData} />
      <FormInput {...formInputProps} />
      <ContentsInput {...contentsInputProps} />
    </NewLayout>
  );
}

const NewLayout = styled.div`
  padding: 70px 16px;
  animation: bottomShow 0.3s linear;
`;

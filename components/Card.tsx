import styled from 'styled-components';

import HamburgerIcon from '../public/icons/menu-burger.svg';
import NotificationIcon from '../public/icons/bell.svg';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { StackBubble } from '../pages/add';
import Link from 'next/link';

interface propsType {
  data: {
    id: string;
    type: string;
    place: string;
    title: string;
    techStack: string[];
  };
}

export default function Card(props: propsType) {
  const { id, type, place, title, techStack } = props.data;
  return (
    <CardLayout>
      <Link href={`/board/${id}`}>
        <CardHeader>
          <Badge className={type}>{type}</Badge>
          <Badge>{place}</Badge>
        </CardHeader>
        <Title>{title}</Title>
        <TechStackWrapper>
          {techStack.map((stack, index) => (
            <StackBubble src={`/icons/stacks/${stack}.png`} key={index} />
          ))}
        </TechStackWrapper>
      </Link>
      <CardFooter></CardFooter>
    </CardLayout>
  );
}

const CardLayout = styled.div`
  > a {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  padding: 10px 15px;
`;

const CardHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Badge = styled.div`
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.grey4};
  &.스터디 {
    background-color: ${({ theme }) => theme.colors.tiffanyblue};
  }
  &.프로젝트 {
    background-color: ${({ theme }) => theme.colors.purple1};
  }
`;

const Title = styled.h1`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.4;
  -webkit-line-clamp: 2;
  font-weight: 700;
`;

const TechStackWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const CardFooter = styled.footer`
  padding: 10px;
`;

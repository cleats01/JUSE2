import styled from 'styled-components';

import HamburgerIcon from '../public/icons/menu-burger.svg';
import NotificationIcon from '../public/icons/bell.svg';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { StackBubble } from '../pages/add';

interface propsType {
  data: {
    type: string;
    place: string;
    title: string;
    techStack: string[];
  };
}

export default function Card(props: propsType) {
  const { type, place, title, techStack } = props.data;
  return (
    <CardLayout>
      <CardHeader>
        <div className={type}>{type}</div>
        <div>{place}</div>
      </CardHeader>
      <Title>{title}</Title>
      <TechStackWrapper>
        {techStack.map((stack) => (
          <StackBubble src={`/icons/stacks/${stack}.png`} />
        ))}
      </TechStackWrapper>
      <CardFooter></CardFooter>
    </CardLayout>
  );
}

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  padding: 10px 15px;
`;

const CardHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;
  > div {
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
  }
`;

const Title = styled.h1`
  line-height: 1.4;
  font-weight: 700;
`;

const TechStackWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CardFooter = styled.footer`
  padding: 10px;
`;

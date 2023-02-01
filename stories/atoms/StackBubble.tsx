import styled from 'styled-components';

export interface IStackBubbleProps {
  stack: string;
  zoom?: number;
}

export default function StackBubble({ stack, zoom }: IStackBubbleProps) {
  return <StyledStackBubble className={stack} zoom={zoom || 1} />;
}

const StyledStackBubble = styled.div<{ zoom?: number }>`
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 999px;
  width: 50px;
  height: 50px;
  background: url('stack-logos.png') no-repeat;
  zoom: ${({ zoom }) => zoom};
  &.aws {
    background-position: -10px -10px;
  }
  &.django {
    background-position: -80px -10px;
  }
  &.docker {
    background-position: -10px -80px;
  }
  &.flutter {
    background-position: -80px -80px;
  }
  &.express {
    background-position: -150px -10px;
  }
  &.go {
    background-position: -150px -80px;
  }
  &.git {
    background-position: -10px -150px;
  }
  &.java {
    background-position: -80px -150px;
  }
  &.graphql {
    background-position: -150px -150px;
  }
  &.jest {
    background-position: -220px -10px;
  }
  &.javascript {
    background-position: -220px -80px;
  }
  &.kotlin {
    background-position: -220px -150px;
  }
  &.mysql {
    background-position: -10px -220px;
  }
  &.kubernetes {
    background-position: -80px -220px;
  }
  &.nestjs {
    background-position: -150px -220px;
  }
  &.mongodb {
    background-position: -220px -220px;
  }
  &.nodejs {
    background-position: -290px -10px;
  }
  &.nextjs {
    background-position: -290px -80px;
  }
  &.php {
    background-position: -290px -150px;
  }
  &.python {
    background-position: -290px -220px;
  }
  &.react {
    background-position: -10px -290px;
  }
  &.reactnative {
    background-position: -80px -290px;
  }
  &.swift {
    background-position: -150px -290px;
  }
  &.spring {
    background-position: -220px -290px;
  }
  &.typescript {
    background-position: -290px -290px;
  }
  &.vue {
    background-position: -360px -10px;
  }
  &.unity {
    background-position: -360px -80px;
  }
  &.svelte {
    background-position: -360px -150px;
  }
`;

import { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  size: string;
  children: ReactNode;
}

export default function UserImgWrapper({ size, children }: IProps) {
  return <UserImg size={size}>{children}</UserImg>;
}

const UserImg = styled.div<{ size: string }>`
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

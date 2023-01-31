import styled from 'styled-components';
import { ReactNode } from 'react';

export interface IButtonFixedPositionProps {
  children: ReactNode;
  bottom: number;
  visible?: boolean;
  size?: number;
  borderColor?: string;
}

export default function ButtonFixedPosition(props: IButtonFixedPositionProps) {
  return <PositionContainer {...props}>{props.children}</PositionContainer>;
}

const PositionContainer = styled.div<IButtonFixedPositionProps>`
  position: fixed;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: ${({ size }) => (size ? `${size}px` : '45px')};
  height: ${({ size }) => (size ? `${size}px` : '45px')};
  bottom: ${({ bottom }) => `${bottom}px`};
  right: max(calc(50% - 205px), 35px);
  z-index: 10;
  color: ${({ borderColor }) => borderColor};
  border-radius: 50%;
  border: 2px solid ${({ borderColor }) => borderColor};
  background-color: #fff;
  cursor: pointer;
`;

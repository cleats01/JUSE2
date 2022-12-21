import { ReactNode } from 'react';
import styled from 'styled-components';

interface propsType {
  children: ReactNode;
}

export default function BottomController(props: propsType) {
  const { children } = props;
  return <BottomControllerLayout>{children}</BottomControllerLayout>;
}

const BottomControllerLayout = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: #fff;
  padding: 15px;
  max-width: 480px;
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    margin: 0 10px 0 5px;
  }
  button {
    flex-grow: 1;
  }
`;

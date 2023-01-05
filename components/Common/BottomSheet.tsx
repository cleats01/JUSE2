import styled from 'styled-components';
import { Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react';

interface IProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function BottomSheet(props: IProps) {
  const { setIsOpen, children } = props;
  const handleClose = (event: MouseEvent) => {
    if (event.target === event.currentTarget) setIsOpen((prev) => !prev);
  };
  return (
    <ModalBackground onClick={handleClose}>
      <SheetContainer>{children}</SheetContainer>
    </ModalBackground>
  );
}

const ModalBackground = styled.nav`
  position: fixed;
  max-width: 480px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #00000080;
  z-index: 5;
`;

const SheetContainer = styled.div`
  position: fixed;
  max-width: 480px;
  min-height: 50vh;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 15px 15px 0 0;
  padding: 20px;
  background-color: #fff;
  animation: bottomShow 0.15s linear;
`;

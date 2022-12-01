import styled from 'styled-components';

import HamburgerIcon from '../public/icons/menu-burger.svg';
import NotificationIcon from '../public/icons/bell.svg';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';

interface propsType {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function BottomSheet(props: propsType) {
  const { setIsOpen, children } = props;
  const handleClose = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) setIsOpen((prev) => !prev);
  };
  return (
    <ModalBackground id='background' onClick={handleClose}>
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
  @keyframes show {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  animation: show 0.15s linear;
`;

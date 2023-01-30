import { ReactNode } from 'react';
import styled from 'styled-components';

export interface INavbarProps {
  leftItem?: ReactNode;
  centerItem?: ReactNode;
  rightItem?: ReactNode;
}

export default function Navbar({
  leftItem,
  centerItem,
  rightItem,
}: INavbarProps) {
  return (
    <NavLayout>
      <LeftItem>{leftItem}</LeftItem>
      {centerItem}
      <RightItem>{rightItem}</RightItem>
    </NavLayout>
  );
}

const NavLayout = styled.nav`
  position: sticky;
  max-width: 480px;
  height: 55px;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey1};
  background-color: #fff;
  z-index: 2;
`;

const LeftItem = styled.div`
  position: absolute;
  left: 20px;
`;

const RightItem = styled.div`
  position: absolute;
  right: 20px;
`;

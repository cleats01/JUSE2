import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import BackIcon from '../public/icons/angle-small-left.svg';
import MenuIcon from '../public/icons/menu-dots-vertical.svg';

export default function NavbarBoard() {
  const router = useRouter();

  return (
    <NavLayout>
      <BackIcon onClick={router.back} />
      <MenuIcon />
    </NavLayout>
  );
}

const NavLayout = styled.nav`
  position: fixed;
  max-width: 480px;
  height: 55px;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey1};
  background-color: #fff;
  z-index: 2;
`;

const MidSpan = styled.span`
  font-size: 16px;
`;

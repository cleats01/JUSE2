import styled from 'styled-components';

import HamburgerIcon from '../public/icons/menu-burger.svg';
import NotificationIcon from '../public/icons/bell.svg';

export default function NavbarMain() {
  return (
    <NavLayout>
      <HamburgerIcon />
      <LogoSpan>JUSE</LogoSpan>
      <NotificationIcon />
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

const LogoSpan = styled.span`
  font-size: 28px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.purple1};
`;

const LoginButton = styled.button``;

import styled from 'styled-components';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function NavBar() {
  const { data, status } = useSession();
  return (
    <NavLayout>
      <LogoSpan>JUSE</LogoSpan>
      {data?.user ? (
        <LoginButton onClick={() => signOut()}>Sign Out</LoginButton>
      ) : (
        <LoginButton onClick={() => signIn()}>Sign In</LoginButton>
      )}
    </NavLayout>
  );
}

const NavLayout = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const LogoSpan = styled.span`
  font-weight: 900;
`;

const LoginButton = styled.button``;

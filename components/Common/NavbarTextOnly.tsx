import { useRouter } from 'next/router';
import styled from 'styled-components';

import { AngleLeftIcon } from 'components/Common/Icons';

interface IProps {
  centerText: string;
  back?: boolean;
}

export default function NavbarTextOnly({ centerText, back }: IProps) {
  const router = useRouter();
  return (
    <NavLayout>
      {back ? <AngleLeftIcon onClick={router.back} /> : ''}
      <CenterSpan>{centerText}</CenterSpan>
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
  > svg {
    position: absolute;
    left: 20px;
  }
`;

const CenterSpan = styled.span`
  font-size: 16px;
`;

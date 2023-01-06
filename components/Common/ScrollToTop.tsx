import styled from 'styled-components';
import { useEffect, useState } from 'react';
import theme from 'styles/theme';

import { AngleUpIcon } from 'components/Common/Icons';

export default function ScrollToTop() {
  const [scrollY, setScrollY] = useState(0);
  const [btnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (scrollY > 300) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleFollow);
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  return (
    <PositionContainer onClick={handleScroll} btnStatus={btnStatus}>
      <AngleUpIcon fill={theme.colors.purple1} width={'35px'} height={'35px'} />
    </PositionContainer>
  );
}

const PositionContainer = styled.div<{ btnStatus?: boolean }>`
  position: fixed;
  display: ${({ btnStatus }) => (btnStatus ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  bottom: 80px;
  right: max(calc(50% - 205px), 35px);
  z-index: 10;
  color: ${({ theme }) => theme.colors.purple1};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.purple1};
  background-color: #fff;
  cursor: pointer;
`;

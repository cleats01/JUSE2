import styled from 'styled-components';

export interface ILogoProps {
  size?: number;
}

const LogoText = ({ size }: ILogoProps) => {
  return <StyledLogo size={size || 24}>JUSE</StyledLogo>;
};

const StyledLogo = styled.span<{ size: number }>`
  font-weight: 900;
  color: ${({ theme }) => theme.colors.purple1};
  font-size: ${({ size }) => `${size}px`};
`;

export default LogoText;

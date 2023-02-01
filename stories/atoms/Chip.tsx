import { ReactNode } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

export interface IChipProps {
  children: ReactNode;
  radius?: number;
  fontSize?: number;
  color?: string;
  outlined?: boolean;
}

const Chip = ({ children, fontSize, color, outlined, radius }: IChipProps) => {
  return (
    <StyledChip
      fontSize={fontSize}
      color={color}
      outlined={outlined}
      radius={radius}>
      {children}
    </StyledChip>
  );
};

export default Chip;

const StyledChip = styled.div<IChipProps>`
  display: inline;
  font-size: ${({ fontSize }) => `${fontSize || 12}px`};
  padding: 5px 10px;

  border: 1px solid
    ${({ color, outlined }) =>
      !outlined ? '#fff' : color || theme.colors.grey4};
  border-radius: ${({ radius }) => `${radius || 5}px`};

  color: ${({ color, outlined }) =>
    !outlined ? '#fff' : color || theme.colors.grey4};
  background-color: ${({ color, outlined }) =>
    outlined ? '#fff' : color || theme.colors.grey4};
`;

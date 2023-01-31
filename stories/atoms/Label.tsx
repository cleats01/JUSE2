import styled from 'styled-components';

export interface ILabelProps {
  children: string;
  fontSize?: number;
}

const Label = (props: ILabelProps) => {
  return <StyledLabel {...props}>{props.children}</StyledLabel>;
};

const StyledLabel = styled.span<{ fontSize?: number }>`
  font-weight: 700;
  font-size: ${({ fontSize }) => `${fontSize}px`};
`;

export default Label;

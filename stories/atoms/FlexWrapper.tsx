import { ReactNode } from 'react';
import styled from 'styled-components';

export interface IFlexWrapperProps {
  children: ReactNode;
  gap?: number;
  direction?: 'row' | 'column';
  center?: boolean;
}

const FlexWrapper = (props: IFlexWrapperProps) => {
  return <StyledFlexWrapper {...props}>{props.children}</StyledFlexWrapper>;
};

const StyledFlexWrapper = styled.div<IFlexWrapperProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  gap: ${({ gap }) => `${gap || 10}px`};
  justify-content: ${({ center }) => (center ? 'center' : '')};
  align-items: ${({ center }) => (center ? 'center' : '')};
`;

export default FlexWrapper;

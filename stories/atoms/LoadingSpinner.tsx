import Spinner from 'public/icons/loading-spinner.svg';
import styled from 'styled-components';

export interface ILoadingSpinnerProps {
  fullScreen?: boolean;
}

export default function LoadingSpinner({ fullScreen }: ILoadingSpinnerProps) {
  return fullScreen ? (
    <FullScreenContainer>
      <Spinner />
    </FullScreenContainer>
  ) : (
    <Spinner />
  );
}

const FullScreenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

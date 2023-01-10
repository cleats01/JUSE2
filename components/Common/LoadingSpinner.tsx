import Spinner from 'public/icons/loading-spinner.svg';
import styled from 'styled-components';

interface IProps {
  fullScreen?: boolean;
}

export default function LoadingSpinner({ fullScreen }: IProps) {
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

import styled from 'styled-components';
import Card from 'components/Common/Card';

interface IProps {
  trending: boardData[];
}

export default function Trending({ trending }: IProps) {
  return (
    <TrendingContainer>
      <TrendingHeader>νμ¬ π₯ν λͺ¨μ</TrendingHeader>
      <CardContainer>
        {trending.map((board: boardData) => (
          <CardOverflow key={board.id}>
            <Card data={board} />
          </CardOverflow>
        ))}
      </CardContainer>
    </TrendingContainer>
  );
}

const TrendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TrendingHeader = styled.h1`
  font-weight: 700;
  font-size: 20px;
  padding-left: 10px;
`;

const CardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  /* μ€ν¬λ‘€ λ° μμ κΈ° */
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CardOverflow = styled.div`
  flex: 0 0 85%;
  scroll-snap-align: start;
`;

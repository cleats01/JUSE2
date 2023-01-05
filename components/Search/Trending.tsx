import styled from 'styled-components';
import Card from 'components/Common/Card';

interface IProps {
  data: boardData[];
}

export default function Trending({ data }: IProps) {
  return (
    <TrendingContainer>
      <TrendingHeader>현재 🔥한 게시물</TrendingHeader>
      <CardContainer>
        {data.map((board: boardData) => (
          <Card key={board.id} data={board} />
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
  flex-direction: column;
  gap: 10px;
`;

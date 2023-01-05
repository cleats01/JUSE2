import styled from 'styled-components';
import Card from '../Card';

export default function Related({ data }: { data: boardData[] }) {
  return (
    <RelatedContainer>
      <RelatedHeader>추천 게시물</RelatedHeader>
      <CardContainer>
        {data.map((board: boardData) => (
          <Card key={board.id} data={board} />
        ))}
      </CardContainer>
    </RelatedContainer>
  );
}

const RelatedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px 0;
`;

const RelatedHeader = styled.h1`
  font-weight: 700;
  font-size: 18px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

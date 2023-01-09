import styled from 'styled-components';
import { Fragment } from 'react';
import { InfiniteData } from 'react-query';

import Card from 'components/Common/Card';

interface IProps {
  data: InfiniteData<any> | undefined;
  lastRef: (node?: Element | null | undefined) => void;
}

export default function Boards(props: IProps) {
  const { data, lastRef } = props;

  return (
    <BoardsContainer>
      {data?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.length ? (
            page.map((board: boardData) => <Card key={board.id} data={board} />)
          ) : (
            <NullMessage>
              <p>해당하는 모임이 존재하지 않습니다.</p>
              <p>직접 원하는 모임을 만들어 보세요!</p>
              <br />
              <p style={{ fontWeight: 700 }}>모임 만들러 가기</p>
              <p style={{ fontSize: '20px' }}>⬇</p>
            </NullMessage>
          )}
        </Fragment>
      ))}
      <div id='lastBoard' ref={lastRef} />
    </BoardsContainer>
  );
}

const BoardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  padding: 0 16px;
`;

const NullMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding-top: 25vh;
  color: ${({ theme }) => theme.colors.grey4};
`;

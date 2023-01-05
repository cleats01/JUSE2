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
          {page?.map((board: boardData) => (
            <Card key={board.id} data={board} />
          ))}
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
`;

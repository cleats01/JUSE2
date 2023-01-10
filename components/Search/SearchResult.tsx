import styled from 'styled-components';
import { User } from '@prisma/client';

import Trending from 'components/Search/Trending';
import Card from 'components/Common/Card';
import Newbie from './Newbie';

interface IProps {
  isSearched: boolean;
  searchResult: boardData[];
  trending: boardData[];
  newbies: User[];
}

export default function SearchResult(props: IProps) {
  const { isSearched, searchResult, trending, newbies } = props;
  return (
    <SearchResultContainer>
      {!isSearched ? (
        <TrendingContainer>
          <Trending trending={trending} />
          <Newbie users={newbies} />
        </TrendingContainer>
      ) : searchResult.length ? (
        <SearchResultMessage>
          총 {searchResult.length}건의 검색 결과를 찾았습니다.
        </SearchResultMessage>
      ) : (
        <SearchResultMessage>검색 결과가 없습니다.</SearchResultMessage>
      )}
      {searchResult.map((board: boardData) => (
        <Card key={board.id} data={board} />
      ))}
    </SearchResultContainer>
  );
}

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
`;

const TrendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const SearchResultMessage = styled.span`
  padding-left: 5px;
  padding-bottom: 5px;
`;

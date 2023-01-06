import styled from 'styled-components';

import Trending from 'components/Search/Trending';
import Card from 'components/Common/Card';

interface IProps {
  isSearched: boolean;
  searchResult: boardData[];
  trending: boardData[];
}

export default function SearchResult(props: IProps) {
  const { isSearched, searchResult, trending } = props;
  return (
    <SearchResultContainer>
      {!isSearched ? (
        <Trending data={trending} />
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

const SearchResultMessage = styled.span`
  padding-left: 5px;
  padding-bottom: 5px;
`;

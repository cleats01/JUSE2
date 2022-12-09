import { InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { boardData } from '..';
import Card from '../../components/Card';
import NavbarTextOnly from '../../components/NavbarTextOnly';
import TabBar from '../../components/TabBar';
import SearchIcon from '../../public/icons/search.svg';

export default function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const [recentSwitch, setRecentSwitch] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<boardData[]>([]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' &&
      searchInput !== '' &&
      !recentSearch.includes(searchInput) &&
      recentSwitch !== 'false'
    ) {
      const local = localStorage.getItem('recentSearch');
      setRecentSearch((prev) => [searchInput, ...prev]);
      localStorage.setItem(
        'recentSearch',
        JSON.stringify(
          local ? [searchInput, ...JSON.parse(local)] : [searchInput]
        )
      );
    }
    if (event.key === 'Enter') {
      axios.get(`/api/boards?search=${searchInput}`).then((res) => {
        setSearchResult(res.data);
      });
      setSearchInput('');
    }
  };

  const recentClick = (event: React.MouseEvent<HTMLElement>) => {
    axios
      .get(`/api/boards?search=${event.currentTarget.innerText}`)
      .then((res) => {
        setSearchResult(res.data);
      });
  };

  const handleSwitch = () => {
    const current = localStorage.getItem('isRecentOn');
    if (current === 'false') {
      localStorage.removeItem('isRecentOn');
      setRecentSwitch(null);
    } else {
      localStorage.setItem('isRecentOn', 'false');
      setRecentSwitch('false');
    }
  };

  const deleteRecent = () => {
    localStorage.removeItem('recentSearch');
    setRecentSearch([]);
  };

  useEffect(() => {
    const localRecentSearch = localStorage.getItem('recentSearch');
    const recentSwitch = localStorage.getItem('isRecentOn');
    if (localRecentSearch !== null) {
      setRecentSearch(JSON.parse(localRecentSearch));
    }
    setRecentSwitch(recentSwitch);
  }, []);

  return (
    <SearchLayout>
      <NavbarTextOnly centerText='검색' />
      <SearchInputContainer>
        <TextField
          value={searchInput}
          onChange={handleSearchInput}
          onKeyPress={handleKeyDown}
          placeholder='프로젝트 / 스터디의 제목을 검색하세요.'
          size='small'
          type='search'
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon width={'16px'} fill={'rgba(0, 0, 0, 0.4)'} />
              </InputAdornment>
            ),
          }}
        />
        <RecentSearchContainer>
          <span>최근검색어</span>
          <ItemsWrapper>
            {recentSearch.length ? (
              recentSearch.map((query, index) => (
                <span key={index} onClick={recentClick}>
                  {query}
                </span>
              ))
            ) : (
              <NullRecent>
                <span>최근 검색어가 없습니다.</span>
              </NullRecent>
            )}
          </ItemsWrapper>
          <RecentFooter>
            {recentSwitch === 'false' ? (
              <span onClick={handleSwitch}>자동저장 켜기</span>
            ) : (
              <span onClick={handleSwitch}>자동저장 끄기</span>
            )}
            <span onClick={deleteRecent}>전체 삭제</span>
          </RecentFooter>
        </RecentSearchContainer>
      </SearchInputContainer>
      <SearchResultContainer>
        <span>총 {searchResult.length}건의 검색 결과를 찾았습니다.</span>
        {searchResult.map((board: boardData, i: number) => (
          <Card
            key={board.id}
            data={{
              id: board.id,
              type: board.type,
              place: board.place,
              title: board.title,
              techStack: board.techStack,
            }}
          />
        ))}
      </SearchResultContainer>
      <TabBar />
    </SearchLayout>
  );
}

const SearchLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 55px 16px;
`;

const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
  padding: 15px 0;
`;

const RecentSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  > span {
    font-weight: 700;
  }
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  > span {
    font-size: 14px;
    background-color: ${({ theme }) => theme.colors.grey1};
    padding: 5px 10px;
    border-radius: 5px;
  }
`;

const NullRecent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  > span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.grey4};
  }
`;

const RecentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  > span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.grey4};
  }
`;

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

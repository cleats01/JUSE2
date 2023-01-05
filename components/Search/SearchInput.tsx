import styled from 'styled-components';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { getBoardsBySearch } from 'utils/axios';

import { InputAdornment, TextField } from '@mui/material';
import { SearchIcon } from 'components/Common/Icons';

interface IProps {
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  recentSearch: string[];
  setRecentSearch: Dispatch<SetStateAction<string[]>>;
  recentSwitch: string | null;
  setSearchResult: Dispatch<SetStateAction<boardData[]>>;
  setIsSearched: Dispatch<SetStateAction<boolean>>;
}

export default function SearchInput(props: IProps) {
  const {
    searchInput,
    setSearchInput,
    recentSearch,
    setRecentSearch,
    recentSwitch,
    setSearchResult,
    setIsSearched,
  } = props;

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
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
      getBoardsBySearch(searchInput).then((data) => setSearchResult(data));
      setSearchInput('');
      setIsSearched(true);
    }
  };

  return (
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
              <SearchIcon width={16} fill={'rgba(0,0,0,0.4)'} />
            </InputAdornment>
          ),
        }}
      />
    </SearchInputContainer>
  );
}

const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 15px;
`;

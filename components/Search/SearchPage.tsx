import { useState } from 'react';
import styled from 'styled-components';
import { User } from '@prisma/client';

import NavbarTextOnly from 'components/Common/NavbarTextOnly';
import ScrollToTop from 'components/Common/ScrollToTop';
import TabBar from 'components/Common/TabBar';
import RecentSearch from 'components/Search/RecentSearch';
import SearchInput from 'components/Search/SearchInput';
import SearchResult from 'components/Search/SearchResult';

interface IProps {
  trending: boardData[];
  newbies: User[];
}

export default function SearchPage({ trending, newbies }: IProps) {
  const [searchInput, setSearchInput] = useState<string>('');
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const [recentSwitch, setRecentSwitch] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<boardData[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const searchInputProps = {
    searchInput,
    setSearchInput,
    recentSearch,
    setRecentSearch,
    recentSwitch,
    setSearchResult,
    setIsSearched,
  };

  const recentSearchProps = {
    recentSearch,
    setRecentSearch,
    recentSwitch,
    setRecentSwitch,
    setSearchResult,
    setIsSearched,
  };

  const searchResultProps = {
    isSearched,
    searchResult,
    trending,
    newbies,
  };

  return (
    <SearchLayout>
      <NavbarTextOnly centerText='검색' />
      <SearchInput {...searchInputProps} />
      <RecentSearch {...recentSearchProps} />
      <SearchResult {...searchResultProps} />
      <ScrollToTop />
      <TabBar />
    </SearchLayout>
  );
}

const SearchLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

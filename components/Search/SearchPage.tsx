import { useState } from 'react';
import styled from 'styled-components';

import NavbarTextOnly from 'components/NavbarTextOnly';
import ScrollToTop from 'components/ScrollToTop';
import TabBar from 'components/TabBar';
import RecentSearch from 'components/Search/RecentSearch';
import SearchInput from 'components/Search/SearchInput';
import SearchResult from 'components/Search/SearchResult';

interface IProps {
  trending: boardData[];
}

export default function SearchPage({ trending }: IProps) {
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
  gap: 20px;
  padding: 55px 16px;
`;

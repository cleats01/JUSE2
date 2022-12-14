import styled from 'styled-components';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { getBoardsBySearch } from 'utils/axios';

interface IProps {
  recentSearch: string[];
  setRecentSearch: Dispatch<SetStateAction<string[]>>;
  recentSwitch: string | null;
  setRecentSwitch: Dispatch<SetStateAction<string | null>>;
  setSearchResult: Dispatch<SetStateAction<boardData[]>>;
  setIsSearched: Dispatch<SetStateAction<boolean>>;
}

export default function RecentSearch(props: IProps) {
  const {
    recentSearch,
    setRecentSearch,
    recentSwitch,
    setRecentSwitch,
    setSearchResult,
    setIsSearched,
  } = props;

  // 로컬스토리지에 있는 최근 검색어 불러오기
  useEffect(() => {
    const localRecentSearch = localStorage.getItem('recentSearch');
    const recentSwitch = localStorage.getItem('isRecentOn');
    if (localRecentSearch !== null) {
      setRecentSearch(JSON.parse(localRecentSearch));
    }
    setRecentSwitch(recentSwitch);
  }, []);

  // 최근 검색어를 클릭했을 때 해당 키워드로 검색
  const recentClick = async (event: React.MouseEvent<HTMLElement>) => {
    await getBoardsBySearch(event.currentTarget.innerText).then((data) =>
      setSearchResult(data)
    );
    setIsSearched(true);
  };

  // 자동저장 켜고 끄기
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

  // 최근 검색어 전체 삭제
  const deleteRecent = () => {
    localStorage.removeItem('recentSearch');
    setRecentSearch([]);
  };

  return (
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
  );
}

const RecentSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 16px;
  padding-top: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
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

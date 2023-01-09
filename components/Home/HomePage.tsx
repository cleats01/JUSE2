import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { getBoards } from 'utils/axios';

import ScrollToTop from 'components/Common/ScrollToTop';
import MainTab from 'components/Home/MainTab';
import Boards from 'components/Home/Boards';
import FilterDrawer from 'components/Home/FilterDrawer';
import TabBar from 'components/Common/TabBar';
import NavbarMain from 'components/Common/NavbarMain';
import Spinner from 'public/icons/loading-spinner.svg';

export default function HomePage() {
  // 필터 State
  const [currentTab, setCurrentTab] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [place, setPlace] = useState('');
  const [offline, setOffline] = useState('');
  const [period, setPeriod] = useState<number[]>([1, 6]);
  const [techStack, setTechStack] = useState<string[]>([]);

  const filterProps = {
    isFilterOpen,
    setIsFilterOpen,
    isClosed,
    setIsClosed,
    place,
    setPlace,
    offline,
    setOffline,
    period,
    setPeriod,
    techStack,
    setTechStack,
  };

  // 무한 스크롤
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  const { data, hasNextPage, fetchNextPage, status } = useInfiniteQuery(
    [currentTab, place, offline, period, techStack, isClosed],
    ({ pageParam = '' }) =>
      getBoards(
        `?id=${pageParam}&type=${currentTab}&place=${
          offline ? offline : place
        }&period=${period.join(',')}&techStack=${techStack.join(
          ','
        )}&isClosed=${isClosed}`
      ),
    {
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
    }
  );

  return (
    <HomeLayout>
      <NavbarMain />
      <MainTab
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setIsFilterOpen={setIsFilterOpen}
      />
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <Boards data={data} lastRef={ref} />
      )}
      <FilterDrawer {...filterProps} />
      <ScrollToTop />
      <TabBar />
    </HomeLayout>
  );
}

const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

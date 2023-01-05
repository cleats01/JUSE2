import { Dispatch, SetStateAction, SyntheticEvent, useEffect } from 'react';
import { MutableRefObject } from 'react';

import { Box, Tab, Tabs } from '@mui/material';

interface IProps {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
  tabRef: MutableRefObject<HTMLElement[] | null[]>;
}

export default function BoardTab(props: IProps) {
  const { currentTab, setCurrentTab, tabRef } = props;

  const handleTabChange = (e: SyntheticEvent, newValue: string) => {
    const tabs = ['모집내용', '모집현황', '추천'];
    const index = tabs.indexOf(newValue);
    const headerHeight = 55 + 48;
    const { offsetTop } = getDimensions(tabRef.current[index] as HTMLElement);
    window.scrollTo({
      top: newValue === '모집내용' ? 0 : offsetTop - headerHeight,
      behavior: 'smooth',
    });
    setTimeout(() => setCurrentTab(newValue), 300);
  };

  const getDimensions = (ele: HTMLElement) => {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;

    return {
      height,
      offsetTop,
      offsetBottom,
    };
  };

  const sectionRefs = [
    { section: '모집내용', ref: tabRef.current[0] },
    { section: '모집현황', ref: tabRef.current[1] },
    { section: '추천', ref: tabRef.current[2] },
  ];

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 55 + 48 + 100;

    const selected = sectionRefs.find(({ section, ref }) => {
      if (ref) {
        const { offsetBottom, offsetTop } = getDimensions(ref);
        return scrollPosition > offsetTop && scrollPosition < offsetBottom;
      }
    });

    if (selected && selected.section !== currentTab) {
      setCurrentTab(selected.section);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
      window.removeEventListener('touchmove', handleScroll);
    };
  });

  return (
    <Box
      sx={{
        position: 'sticky',
        top: '55px',
        backgroundColor: '#fff',
        zIndex: 2,
      }}>
      <Tabs value={currentTab} onChange={handleTabChange} variant={'fullWidth'}>
        <Tab value='모집내용' label='모집내용' />
        <Tab value='모집현황' label='모집현황' />
        <Tab value='추천' label='추천' />
      </Tabs>
    </Box>
  );
}

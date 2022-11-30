import { useState } from 'react';
import styled from 'styled-components';
import CloseBtnIcon from '../public/icons/close.svg';

const TechStack = ({ selected, setSelected }) => {
  const [currentTab, setCurrentTab] = useState('프론트엔드');

  //현재 탭 변경
  const tabHandler = (e) => {
    setCurrentTab(e.target.innerText);
  };

  // 모든 스택 이름
  const stacks = {
    프론트엔드: [
      'JavaScript',
      'TypeScript',
      'React',
      'Vue',
      'Svelte',
      'Next',
      'GraphQl',
    ],
    백엔드: [
      'Java',
      'Spring',
      'Nodejs',
      'Nestjs',
      'Go',
      'Express',
      'MySQL',
      'MongoDB',
      'Python',
      'Django',
      'php',
    ],
    모바일: ['Flutter', 'Swift', 'Kotlin', 'ReactNative', 'Unity'],
    기타: ['AWS', 'Kubernetes', 'Docker', 'Git', 'Jest'],
  };

  //스택 선택 -> 스택은 무조건 우선 소문자화하여 배열에 저장
  const stackClickHandler = (el) => {
    if (selected.includes(el)) {
      const deletedArr = selected.filter((e) => e !== el);
      setSelected(deletedArr);
    } else {
      setSelected((prev) => [...prev, el]);
    }
  };

  //스택 초기화
  const stackResetHandler = () => {
    setSelected([]);
  };

  //스택 삭제
  const stackDeleteHandler = (idx) => {
    const deletedArr = selected.filter((e, i) => i !== idx);
    setSelected(deletedArr);
  };

  return (
    <TechStackContainer>
      <StackTab className='tab'>
        {Object.keys(stacks).map((el, i) => (
          <li
            onClick={tabHandler}
            className={currentTab === el ? 'is-active' : ''}
            key={i}>
            {el}
          </li>
        ))}
      </StackTab>
      <StackContainer>
        {stacks[currentTab].map((el, i) => (
          <StackBubble
            key={i}
            onClick={() => stackClickHandler(el.toLowerCase())}
            className={
              !selected.includes(el.toLowerCase()) && selected.length > 0
                ? 'not-selected'
                : ''
            }>
            <Stack src={`/icons/stacks/${el}.png`} alt={el} />
            <span>{el}</span>
          </StackBubble>
        ))}
      </StackContainer>
      {selected.length ? (
        <SelectedContainer>
          {selected.map((e, i) => (
            <SelectedStack key={i}>
              {e}
              <CloseBtnIcon onClick={() => stackDeleteHandler(i)} />
            </SelectedStack>
          ))}
          <ResetButton onClick={stackResetHandler}>선택 초기화</ResetButton>
        </SelectedContainer>
      ) : (
        ''
      )}
    </TechStackContainer>
  );
};

const TechStackContainer = styled.div``;

const StackTab = styled.ul`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey1};
  margin-bottom: 15px;
  font-size: 14px;
  > li {
    color: ${({ theme }) => theme.colors.grey3};
    padding: 10px 0;
    margin-right: 10px;
    cursor: pointer;
  }
  > .is-active {
    color: inherit;
    border-bottom: 2px solid ${({ theme }) => theme.colors.purple1};
  }
`;

const StackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StackBubble = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px 3px 3px;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 999px;
  font-size: 12px;
  cursor: pointer;
  &.not-selected {
    opacity: 0.6;
  }
  :hover {
    border: 1px solid ${({ theme }) => theme.colors.purple1};
    opacity: 1;
    transform: scale(1.07);
    transition: 0.2s;
  }
`;

const Stack = styled.img`
  /* border: 1px solid ${({ theme }) => theme.colors.grey2}; */
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;

const SelectedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 20px 0;
`;

const SelectedStack = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px;
  background-color: ${({ theme }) => theme.colors.grey1};
  font-size: 12px;
  border-radius: 5px;
  > svg {
    color: ${({ theme }) => theme.colors.grey4};
    cursor: pointer;
  }
`;

const ResetButton = styled.button`
  padding: 5px 10px;
  background: #ffffff;
  font-size: 12px;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 4px;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.purple1};
    border: 1px solid ${({ theme }) => theme.colors.purple1};
    background: ${({ theme }) => theme.background};
  }
`;

export default TechStack;

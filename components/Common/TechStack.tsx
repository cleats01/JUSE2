import styled from 'styled-components';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import Image from 'next/image';

import { CloseIcon } from 'components/Common/Icons';

interface IProps {
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
}

const TechStack = ({ selected, setSelected }: IProps) => {
  const [currentTab, setCurrentTab] = useState<string>('프론트엔드');

  //현재 탭 변경
  const tabHandler = (e: MouseEvent<HTMLElement>) => {
    const eventTarget = e.target as HTMLElement;
    setCurrentTab(eventTarget.innerText);
  };

  // 모든 스택 이름
  const stacks = {
    프론트엔드: [
      'JavaScript',
      'TypeScript',
      'React',
      'Vue',
      'Svelte',
      'Nextjs',
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

  const stackClickHandler = (el: string) => {
    if (selected.includes(el)) {
      const deletedArr = selected.filter((e: string) => e !== el);
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
  const stackDeleteHandler = (idx: number) => {
    const deletedArr = selected.filter((e, i: number) => i !== idx);
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
        {stacks[currentTab as keyof typeof stacks].map(
          (el: string, i: number) => (
            <StackBubble
              key={i}
              onClick={() => stackClickHandler(el)}
              className={
                !selected.includes(el) && selected.length > 0
                  ? 'not-selected'
                  : ''
              }>
              <Stack
                src={`/icons/stacks/${el}.png`}
                alt={el}
                width={25}
                height={25}
                sizes={'25px'}
              />
              <span>{el}</span>
            </StackBubble>
          )
        )}
      </StackContainer>
      {selected.length ? (
        <SelectedContainer>
          {selected.map((e, i) => (
            <SelectedStack key={i}>
              {e}
              <CloseIcon onClick={() => stackDeleteHandler(i)} />
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

const TechStackContainer = styled.div`
  padding-bottom: 20px;
`;

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
`;

const Stack = styled(Image)`
  border-radius: 50%;
`;

const SelectedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding-top: 20px;
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
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 4px;
  cursor: pointer;
`;

export default TechStack;

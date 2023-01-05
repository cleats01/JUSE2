import styled from 'styled-components';

import { Dispatch, SetStateAction, useState } from 'react';
import BottomSheet from 'components/Common/BottomSheet';
import TechStack from 'components/Common/TechStack';

interface IProps {
  techStack: string[];
  setTechStack: Dispatch<SetStateAction<string[]>>;
}

export default function TechStackSelector(props: IProps) {
  const { techStack, setTechStack } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {isModalOpen ? (
        <BottomSheet setIsOpen={setIsModalOpen}>
          <BottomSheetHeader>
            사용 기술 스택
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}>
              완료
            </button>
          </BottomSheetHeader>
          <TechStack selected={techStack} setSelected={setTechStack} />
        </BottomSheet>
      ) : (
        ''
      )}
      <StackAddButton onClick={() => setIsModalOpen((prev) => !prev)}>
        {techStack.length
          ? techStack.map((stack) => (
              <StackBubble key={stack} src={`/icons/stacks/${stack}.png`} />
            ))
          : '기술 스택 추가'}
      </StackAddButton>
    </>
  );
}

export const StackAddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 5px;
  padding: 10px;
`;

export const StackBubble = styled.img`
  width: 30px;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 999px;
`;

export const BottomSheetHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: 700;
`;

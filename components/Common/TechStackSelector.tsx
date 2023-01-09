import styled from 'styled-components';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';

import { Drawer } from '@mui/material';
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
      <StackAddButton onClick={() => setIsModalOpen((prev) => !prev)}>
        {techStack.length
          ? techStack.map((stack) => (
              <StackBubble
                key={stack}
                src={`/icons/stacks/${stack}.png`}
                alt={stack}
                width={30}
                height={30}
              />
            ))
          : '기술 스택 추가'}
      </StackAddButton>
      <CustomDrawer
        anchor='bottom'
        open={isModalOpen}
        onClose={() => setIsModalOpen((prev) => !prev)}>
        <DrawerContainer>
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
        </DrawerContainer>
      </CustomDrawer>
    </>
  );
}

const CustomDrawer = styled(Drawer)`
  max-width: 480px;
  margin: auto;
  .MuiDrawer-paper {
    position: absolute;
    bottom: 0;
    border-radius: 15px 15px 0 0;
    max-width: 480px;
  }
`;

const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  min-height: 50vh;
  max-width: 480px;
  margin: auto;
`;

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

export const StackBubble = styled(Image)`
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

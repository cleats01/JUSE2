import styled from 'styled-components';

import { StackBubble } from 'components/Common/TechStackSelector';
import { InfoLabel, InfoWrapper } from 'components/Board/BoardPage';

interface IProps {
  place: string;
  period: string;
  techStack: string[];
}

export default function BasicInfo(props: IProps) {
  const { place, period, techStack } = props;

  return (
    <InfoWrapper>
      <Info>
        <InfoLabel>진행 장소</InfoLabel>
        <span>{place}</span>
      </Info>
      <Info>
        <InfoLabel>진행 기간</InfoLabel>
        <span>{period}</span>
      </Info>
      <Info>
        <InfoLabel>기술 스택</InfoLabel>
        <StackWrapper>
          {techStack.map((stack) => (
            <StackBubble
              src={`/icons/stacks/${stack}.png`}
              key={stack}
              alt={stack}
              width={30}
              height={30}
              sizes={'30px'}
              priority
            />
          ))}
        </StackWrapper>
      </Info>
    </InfoWrapper>
  );
}

const Info = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  min-width: 50%;
`;

const StackWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

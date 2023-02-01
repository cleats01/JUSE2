import styled from 'styled-components';

import { InfoLabel, InfoWrapper } from 'components/Board/BoardPage';
import StackLogo from 'components/Common/StackLogo';

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
            <StackLogo key={stack} stack={stack.toLowerCase()} zoom={0.6} />
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

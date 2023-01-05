import styled from 'styled-components';

interface IProps {
  type: string;
  place: string;
  title: string;
}

export default function BoardHeader(props: IProps) {
  const { type, place, title } = props;

  return (
    <BoardHeaderContainer>
      <BadgeWrapper>
        <Badge className={type}>{type}</Badge>
        <Badge>{place}</Badge>
      </BadgeWrapper>
      <Title>{title}</Title>
    </BoardHeaderContainer>
  );
}

const BoardHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
`;

const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Badge = styled.div`
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.grey4};
  &.스터디 {
    background-color: ${({ theme }) => theme.colors.tiffanyblue};
  }
  &.프로젝트 {
    background-color: ${({ theme }) => theme.colors.purple1};
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 20px;
  line-height: 1.4;
`;

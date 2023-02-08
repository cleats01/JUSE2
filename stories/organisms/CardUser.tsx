import UserInfo from '@stories/molecules/UserInfo';
import styled from 'styled-components';

export interface ICardUserProps {
  image: string;
  nickname: string;
  like: number;
  userTechStack: string[];
}

export default function CardUser(props: ICardUserProps) {
  return (
    <CardContainer>
      <UserInfo {...props} />
    </CardContainer>
  );
}

const CardContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 10px;
`;

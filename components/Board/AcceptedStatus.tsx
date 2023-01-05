import styled from 'styled-components';
import theme from 'styles/theme';
import { position, userSimple } from '@prisma/client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Chip,
} from '@mui/material';
import { AngleDownIcon } from 'components/Common/Icons';
import { InfoLabel, InfoWrapper } from 'components/Board/BoardPage';

interface IProps {
  application: position[];
}

export default function AcceptedStatus(props: IProps) {
  const { application } = props;

  return (
    <InfoWrapper className='column'>
      <InfoLabel>모집 현황</InfoLabel>
      <div>
        {application.map((position) => (
          <AccordionCustom
            key={position.position}
            square
            disableGutters
            elevation={0}>
            <AccordionSummary
              expandIcon={
                <AngleDownIcon
                  fill={theme.colors.grey4}
                  width={25}
                  height={25}
                />
              }
              aria-controls='panel1a-content'
              id='panel1a-header'>
              <PositionInfo>
                <span className='position-name'>{position.position}</span>
                <span className='position-count'>
                  {position.accept.length} / {position.count}
                </span>
              </PositionInfo>
            </AccordionSummary>
            <AccordionDetails>
              {position.accept.length ? (
                <UserChipsWrapper>
                  {position.accept.map((user: userSimple) => (
                    <Chip
                      key={user.id}
                      avatar={<Avatar alt={user.nickname} src={user.image} />}
                      label={user.nickname}
                      variant='outlined'
                      component='a'
                      href={`/user/${user.id}`}
                      clickable
                    />
                  ))}
                </UserChipsWrapper>
              ) : (
                <NullMessage>
                  해당 포지션에 참여중인 유저가 없습니다.
                </NullMessage>
              )}
            </AccordionDetails>
          </AccordionCustom>
        ))}
      </div>
    </InfoWrapper>
  );
}

const AccordionCustom = styled(Accordion)`
  &:before {
    display: none;
  }
  .MuiButtonBase-root {
    padding: 0;
  }
  .MuiAccordionDetails-root {
    padding: 0;
  }
`;

const PositionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 35px;
  > .position-name {
    font-weight: 500;
    width: 40%;
  }
  > .position-count {
    margin-right: 60px;
  }
`;

const UserChipsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const NullMessage = styled.span`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.grey4};
`;

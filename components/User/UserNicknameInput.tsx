import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/react';
import { getNickname } from 'utils/axios';

import { Box, TextField } from '@mui/material';

interface IProps {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  nicknameCheck: string;
  setNicknameCheck: Dispatch<SetStateAction<string>>;
}

export default function UserNicknameInput(props: IProps) {
  const { nickname, setNickname, nicknameCheck, setNicknameCheck } = props;
  const { data: session, status } = useSession();
  const regex = /^[가-힣|a-z|A-Z|0-9|]+$/;

  const handleNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value as string);
    if (event.target.value) {
      if (event.target.value.length < 2) {
        setNicknameCheck('닉네임은 2자 이상 입력해주세요.');
      } else if (event.target.value.length > 8) {
        setNicknameCheck('닉네임은 8자 이내로 입력해주세요.');
      } else if (!regex.test(event.target.value)) {
        setNicknameCheck('닉네임은 한글,영어,숫자만 가능합니다.');
      } else {
        getNickname(event.target.value).then((data) => {
          if (event.target.value === session?.user.nickname || data.available) {
            setNicknameCheck('사용가능한 닉네임입니다.');
          } else {
            setNicknameCheck('중복된 닉네임이 존재합니다.');
          }
        });
      }
    } else {
      setNicknameCheck('');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        value={nickname}
        onChange={handleNickname}
        label='닉네임을 입력해 주세요.'
        size='small'
        fullWidth
      />
      <NicknameCheck nicknameCheck={nicknameCheck}>
        {nicknameCheck}
      </NicknameCheck>
    </Box>
  );
}

const NicknameCheck = styled.p<{ nicknameCheck: string }>`
  padding: 5px 0 0 5px;
  font-size: 14px;
  color: ${({ nicknameCheck, theme }) =>
    nicknameCheck === '사용가능한 닉네임입니다.'
      ? theme.colors.purple1
      : 'tomato'};
`;

import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';

import { TextField } from '@mui/material';
import TextEditor from 'components/Common/TextEditor';

interface IProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

export default function ContentsInput(props: IProps) {
  const { title, setTitle, content, setContent } = props;

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value as string);
  };

  return (
    <ContentsContainer>
      <TextField
        label='제목'
        value={title}
        onChange={handleTitle}
        variant='outlined'
        fullWidth
      />
      <TextEditor content={content} setContent={setContent} />
    </ContentsContainer>
  );
}

const ContentsContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 5px;
`;

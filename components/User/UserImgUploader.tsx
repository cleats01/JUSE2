import styled from 'styled-components';
import { useRef, ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { Button } from '@mui/material';
import UserImgWrapper from 'components/Common/UserImgWrapper';

interface IProps {
  imageEdit?: string;
  setImageEdit?: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  setImageURL: Dispatch<SetStateAction<string>>;
}

export default function UserImgUploader(props: IProps) {
  const { imageEdit, setImageEdit, setImageFile, setImageURL } = props;
  const [objectURL, setObjectURL] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 화면 상단에 이미지 표시
  const uploadToClient = (e: ChangeEvent<HTMLInputElement>) => {
    if (objectURL) {
      URL.revokeObjectURL(objectURL);
    }
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      setImageFile(i);
      setImageURL(Math.random().toString(36).substring(2, 11));
      setObjectURL(URL.createObjectURL(i));
    }
  };

  const deleteUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (imageEdit && setImageEdit) {
      setImageEdit('');
      setImageFile(null);
    }
    setImageURL('');
    setObjectURL('');
  };

  return (
    <ImageUploadWrapper>
      <UserImgWrapper size={'100px'}>
        <img
          src={objectURL || imageEdit || '/user-default.png'}
          alt='user-image'
        />
      </UserImgWrapper>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        hidden
        onChange={uploadToClient}
      />
      <div>
        <Button
          onClick={() => {
            fileInputRef.current?.click();
          }}>
          업로드
        </Button>
        <Button sx={{ color: 'tomato' }} onClick={deleteUpload}>
          삭제
        </Button>
      </div>
    </ImageUploadWrapper>
  );
}

const ImageUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

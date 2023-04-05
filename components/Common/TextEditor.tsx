import styled from 'styled-components';
import { useMemo, Dispatch, SetStateAction, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { debounce } from 'lodash';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

interface IProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

export default function TextEditor(props: IProps) {
  const { content, setContent } = props;

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ['small', false, 'large'] }],
          ['bold', 'underline', 'strike'],
        ],
      },
    }),
    []
  );

  const handleOnChange = debounce((content) => {
    setContent(content);
  }, 500);

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <>
      <TextStyleCustom>
        <ReactQuill
          value={content}
          onChange={handleOnChange}
          modules={modules}
          theme={'snow'}
          placeholder={`내용을 입력해주세요.`}
        />
      </TextStyleCustom>
    </>
  );
}

const TextStyleCustom = styled.div`
  p {
    font-size: 16px;
  }
  strong {
    font-weight: 700;
  }
  s {
    text-decoration: line-through;
  }
  .ql-size-small {
    font-size: 14px;
  }
  .ql-size-large {
    font-size: 22px;
  }
  .ql-container {
    min-height: 150px;
    border-radius: 0 0 3px 3px;
  }
  .ql-toolbar {
    border-radius: 3px 3px 0 0;
  }
  .ql-blank::before {
    font-size: 16px;
  }
`;

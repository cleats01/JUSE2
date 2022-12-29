import { useMemo, Dispatch, SetStateAction } from 'react';
import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';
import styled from 'styled-components';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

interface propsType {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

export default function TextEditor(props: propsType) {
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

  return (
    <>
      <TextStyleCustom>
        <ReactQuill
          value={content}
          onChange={setContent}
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

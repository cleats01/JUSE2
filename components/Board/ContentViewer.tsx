import 'react-quill/dist/quill.bubble.css';

import dynamic from 'next/dynamic';
import styled from 'styled-components';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

interface propsType {
  content: string;
}

export default function ContentViewer(props: propsType) {
  const { content } = props;

  return (
    <>
      <TextStyleReset>
        <ReactQuill value={content} theme='bubble' readOnly={true} />
      </TextStyleReset>
    </>
  );
}

const TextStyleReset = styled.div`
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
  .ql-editor {
    padding: 20px 5px;
  }
  .ql-toolbar {
    border-radius: 3px 3px 0 0;
  }
  .ql-blank::before {
    font-size: 16px;
  }
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
`;

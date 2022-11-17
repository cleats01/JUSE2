import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang='ko'>
        <Head>
          <link
            rel='stylesheet'
            as='style'
            href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;

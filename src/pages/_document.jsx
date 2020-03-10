import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import { resetStyles } from '../styles/resetStyle';

export default class MyDocument extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <style jsx>{resetStyles}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

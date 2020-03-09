// [How to write _document in TypeScript Next.js](https://spectrum.chat/next-js/general/how-to-write-document-in-typescript~1a34d27b-d1b2-4259-b178-e69873db0fdc)
// [next-amp-styled/_document.js at master jacknevitt/next-amp-styled](https://github.com/jacknevitt/next-amp-styled/blob/master/pages/_document.js)
import * as React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const getStyleTag = () => {
  const sheet = new ServerStyleSheet();
  const styleTags = sheet.getStyleElement();
  const styleTagsArray = Array.isArray(styleTags) ? styleTags : [styleTags];
  const inlineCss = styleTagsArray.reduce((inlineStyles, currentStylesheet) => {
    if (currentStylesheet && currentStylesheet.props) {
      return `${inlineStyles}${(currentStylesheet.props as any).dangerouslySetInnerHTML.__html}`;
    }
    return inlineStyles;
  }, '');

  return <style amp-custom="" dangerouslySetInnerHTML={{ __html: inlineCss }} />;
};

export default class MyDocument extends NextDocument {
  static async getInitialProps(ctx: any) {
    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      styleTag: getStyleTag(),
    };
  }

  public render() {
    return (
      <Html lang="ja">
        <Head>{(this.props as any).styleTag}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

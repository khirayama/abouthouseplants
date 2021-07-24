import * as React from 'react';
import flush from 'styled-jsx/server';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import { init } from '../utils/init';

init();

export default class MyDocument extends NextDocument {
  render() {
    const styles = flush();

    return (
      <Html lang="ja">
        <Head>
          {styles}
          <script
            async
            custom-element="amp-analytics"
            src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
          ></script>
          <link rel="icon" type="image/png" href="/images/icon.1x.png" />
        </Head>
        <body>
          <amp-analytics type="gtag" data-credentials="include">
            <script
              type="application/json"
              dangerouslySetInnerHTML={{
                __html: `{
              "vars": {
                "gtag_id": "UA-160291296-1",
                "config" : {
                  "UA-160291296-1": {
                    "groups": "default",
                    "site_speed_sample_rate": 100
                  }
                }
              }
            }`,
              }}
            />
          </amp-analytics>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

import * as React from 'react';
import Head from 'next/head';

import { ResetStyle } from '../styles/ResetStyle';

type LayoutProps = {
  title: string;
  description: string;
  keywords: string[];
  children: React.ReactNode;
};

export function Layout(props: LayoutProps) {
  return (
    <div>
      <ResetStyle />
      <Head>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords.join(',')} />
      </Head>
      {props.children}
    </div>
  );
}

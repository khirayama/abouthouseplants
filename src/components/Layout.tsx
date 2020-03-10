import * as React from 'react';
import css from 'styled-jsx/css';
import Head from 'next/head';

type LayoutProps = {
  title: string;
  description: string;
  keywords: string[];
  children: React.ReactNode;
};

const styles = css`
  .container {
    max-width: 768px;
    margin: 0 auto;
  }
`;

export function Layout(props: LayoutProps) {
  return (
    <div>
      <style jsx>{styles}</style>
      <Head>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords.join(',')} />
      </Head>
      <div className="container">{props.children}</div>
    </div>
  );
}

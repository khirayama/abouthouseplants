import * as React from 'react';
import css from 'styled-jsx/css';

import { config as siteConfig } from '../config';
import { Resource, ResourceShape } from '../utils/Resource';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { FeaturedMemo } from '../components/FeaturedMemo';

export const config = { amp: true };

export const data = {
  title: 'メモ一覧',
  description: siteConfig.description,
  keywords: [],
};

type LabelsPageProps = {
  pathname: string;
  resource: {
    memos: ResourceShape[];
  };
};

const styles = css`
  .container {
    padding: 24px;
  }
`;

export default function LabelsPage(props: LabelsPageProps) {
  const memos = props.resource.memos;

  return (
    <>
      <style jsx>{styles}</style>
      <Layout title={data.title} description={data.description} keywords={data.keywords}>
        <Header pathname={props.pathname} />
        <div className="container">
          <Heading>{data.title}</Heading>
          <ul>
            {memos.map(memo => {
              return (
                <li key={memo.id}>
                  <FeaturedMemo memo={memo} />
                </li>
              );
            })}
          </ul>
        </div>
        <Footer />
      </Layout>
    </>
  );
}

LabelsPage.getInitialProps = (data: any): LabelsPageProps => {
  const memos = Resource.find('memos');

  return {
    pathname: data.pathname,
    resource: {
      memos,
    },
  };
};

import * as React from 'react';
import css from 'styled-jsx/css';

import { config as siteConfig } from '../config';
import { Resource, ResourceShape, ResourceData } from '../utils/Resource';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { FeaturedMemo } from '../components/FeaturedMemo';

export const config = { amp: true };

export const data: ResourceData = {
  title: 'メモ一覧',
  description: siteConfig.description,
  thumbnail: '',
  seo: {
    title: 'メモ一覧',
    description: siteConfig.description,
    thumbnail: '',
    keywords: [],
  },
  created: '2020-03-12T18:00:00.000+09:00',
  updated: '2020-03-22T09:00:00.000+09:00',
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
      <Layout {...data.seo}>
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
    pathname: data.req.url,
    resource: {
      memos,
    },
  };
};

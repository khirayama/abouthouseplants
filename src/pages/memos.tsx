import * as React from 'react';
import css from 'styled-jsx/css';

import { config as siteConfig } from '../config';
import { resource, Resource, MemoResourceData } from '../utils/resource';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FeaturedMemo } from '../components/FeaturedMemo';

export const config = { amp: true };

export const data = {
  title: `ノート | ${siteConfig.name}`,
  description: siteConfig.description,
  keywords: [],
};

type IndexPageProps = {
  pathname: string;
  resource: {
    intro: Resource<MemoResourceData>;
    labels: Resource[];
  };
};

const styles = css`
  .featured-memo-container {
    text-align: center;
    padding: 24px;
  }
`;

export default function IndexPage(props: IndexPageProps) {
  const intro = props.resource.intro;
  const labels = props.resource.labels.map(label => label.data.title);

  return (
    <>
      <style jsx>{styles}</style>
      <Layout title={data.title} description={data.description} keywords={data.keywords}>
        <Header pathname={props.pathname} />
        <div className="featured-memo-container">
          <FeaturedMemo memo={intro} />
        </div>
        <Footer />
      </Layout>
    </>
  );
}

IndexPage.getInitialProps = (data: any): IndexPageProps => {
  const intro = resource.get<MemoResourceData>('memos', 'introduction');
  const labels = resource.getCollection('labels', intro.data.labels);

  return {
    pathname: data.pathname,
    resource: {
      intro,
      labels,
    },
  };
};

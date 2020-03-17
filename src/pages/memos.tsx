import * as React from 'react';
import css from 'styled-jsx/css';

import { config as siteConfig } from '../config';
import { Resource, ResourceShape } from '../utils/Resource';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FeaturedMemo } from '../components/FeaturedMemo';

export const config = { amp: true };

export const data = {
  title: `メモ | ${siteConfig.name}`,
  description: siteConfig.description,
  keywords: [],
};

type IndexPageProps = {
  pathname: string;
  resource: {
    intro: ResourceShape;
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
  const intro = Resource.findOne('memos', 'introduction');

  return {
    pathname: data.pathname,
    resource: {
      intro,
    },
  };
};

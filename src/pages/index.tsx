import * as React from 'react';
import css from 'styled-jsx/css';

import { config as siteConfig } from '../config';
import { Resource, ResourceShape, ResourceData } from '../utils/Resource';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FeaturedMemo } from '../components/FeaturedMemo';

export const config = { amp: true };

export const data: ResourceData = {
  title: siteConfig.name,
  description: '選び方、育て方など入門から、飾り方、増やし方など楽しみ方まで',
  thumbnail: '',
  seo: {
    title: `${siteConfig.name} - 選び方、育て方など入門から、飾り方、増やし方など楽しみ方まで`,
    description: '選び方、育て方など入門から、飾り方、増やし方など楽しみ方まで',
    thumbnail: '',
    keywords: ['観葉植物', '入門', '基礎知識', '選び方', '育て方'],
  },
  created: '2020-03-12T18:00:00.000+09:00',
  updated: '2020-03-23T09:00:00.000+09:00',
};

type IndexPageProps = {
  pathname: string;
  resource: {
    intro: ResourceShape;
  };
};

const styles = css`
  .container {
    padding: 24px;
  }
  .featured-memo-container {
    text-align: center;
  }
`;

export default function IndexPage(props: IndexPageProps) {
  const intro = props.resource.intro;

  return (
    <>
      <style jsx>{styles}</style>
      <Layout {...data.seo}>
        <Header pathname={props.pathname} />
        <div className="container">
          <div className="featured-memo-container">
            <FeaturedMemo memo={intro} />
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
}

IndexPage.getInitialProps = (data: any): IndexPageProps => {
  const intro = Resource.findOne('memos', 'introduction');

  return {
    pathname: data.req.url,
    resource: {
      intro,
    },
  };
};

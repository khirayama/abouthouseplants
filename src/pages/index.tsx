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
  description: '基礎知識、選び方、育て方を中心に、手入れ、楽しみ方まで。',
  thumbnail: '',
  seo: {
    title: '観葉植物入門 - 基礎知識、選び方、育て方を中心に、手入れ、楽しみ方まで。',
    description:
      '第一歩となる網羅的な知識を紹介。観葉植物の基礎知識から、選び方、育て方について。また充実のための手入れと楽しみ方も紹介します。',
    thumbnail: '',
    keywords: ['観葉植物', '入門', '基礎知識', '選び方', '育て方'],
  },
  created: '2020-03-12T18:00:00.000+09:00',
  updated: '2020-03-22T09:00:00.000+09:00',
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

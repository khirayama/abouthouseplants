import * as React from 'react';
import { css } from 'styled-jsx/css';

import { config as siteConfig } from '../config';
import { ResourceData } from '../utils/Resource';
import { generateSitemap, SitemapNode } from '../utils/sitemap';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heading } from '../components/Heading';
import { Link } from '../components/Link';

export const config = { amp: true };

export const data: ResourceData = {
  title: '目次・サイトマップ',
  description: `${siteConfig.name}の目次・サイトマップ。`,
  thumbnail: '',
  seo: {
    title: '目次・サイトマップ',
    description: `${siteConfig.name}の目次・サイトマップ。`,
    thumbnail: '',
    keywords: ['観葉植物', '入門', '基礎知識', '選び方', '育て方'],
  },
  created: '2020-03-12T18:00:00.000+09:00',
  updated: '2020-03-22T09:00:00.000+09:00',
};

type SitemapPageProps = {
  pathname: string;
  sitemap: SitemapNode[];
};

const styles = css`
  .container {
    padding: 24px;
  }
`;

const listStyles = css`
  .list {
    padding: 0 0 8px;
  }
  .list .list {
    padding: 4px 0 4px 36px;
  }
  .list-item {
    text-decoration: underline;
  }
`;

export default function SitemapPage(props: SitemapPageProps) {
  function renderList(sitemap: SitemapNode[]) {
    return (
      <>
        <style jsx>{listStyles}</style>
        <ul className="list">
          {sitemap.map(site => {
            return (
              <li key={site.slug} className="list-item">
                <Link to={site.slug}>{site.title}</Link>
                {renderList(site.children)}
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  return (
    <>
      <style jsx>{styles}</style>
      <Layout {...data.seo}>
        <Header pathname={props.pathname} />
        <div className="container">
          <Heading>{data.title}</Heading>
          {renderList(props.sitemap)}
        </div>
        <Footer />
      </Layout>
    </>
  );
}

SitemapPage.getInitialProps = (data: any): SitemapPageProps => {
  return {
    pathname: data.req.url,
    sitemap: generateSitemap().filter(sm => sm.slug !== '/sitemap' && sm.slug !== '/404'),
  };
};

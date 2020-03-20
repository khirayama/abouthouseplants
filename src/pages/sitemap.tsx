import * as React from 'react';
import css from 'styled-jsx/css';

import { config as siteConfig } from '../config';
import { generateSitemap, SitemapNode } from '../utils/sitemap';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heading } from '../components/Heading';
import { Link } from '../components/Link';

export const config = { amp: true };

export const data = {
  title: '目次・サイトマップ',
  description: siteConfig.description,
  keywords: [],
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
                <Link to={site.slug}>{site.title.replace(` | ${siteConfig.name}`, '')}</Link>
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
      <Layout
        title={`サイトマップ | ${siteConfig.name}`}
        description={`${siteConfig.name}のサイトマップ`}
        keywords={['サイトマップ', siteConfig.name]}
      >
        <Header pathname={props.pathname} />
        <div className="container">
          <Heading>目次・サイトマップ</Heading>
          {renderList(props.sitemap)}
        </div>
        <Footer />
      </Layout>
    </>
  );
}

SitemapPage.getInitialProps = (data: any): SitemapPageProps => {
  return {
    pathname: data.pathname,
    sitemap: generateSitemap().filter(sm => sm.slug !== '/sitemap'),
  };
};

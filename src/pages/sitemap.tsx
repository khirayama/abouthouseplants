import * as React from 'react';
import css from 'styled-jsx/css';

import nextConfig from '../../next.config';

import { config as siteConfig } from '../config';
import { resource } from '../utils/resource';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heading } from '../components/Heading';
import { Link } from '../components/Link';

export const config = { amp: true };

export const data = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [],
};

type SitemapNode = {
  slug: string;
  title: string;
  children: SitemapNode[];
};

type PathMap = {
  [slug: string]: {
    page: string;
    query?: { id: string };
  };
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
  const sitemap: SitemapNode[] = [];
  const exportPathMap: PathMap = nextConfig.exportPathMap() as PathMap;

  const slugs = Object.keys(exportPathMap)
    .sort((a: string, b: string) => {
      return a.split('/').length - b.split('/').length;
    })
    .filter(slug => slug !== 'sitemap');
  slugs.forEach((slug: string) => {
    const pathMap = exportPathMap[slug];
    if (!pathMap.query) {
      const { data } = require(`.${pathMap.page}`);
      const title = data ? data.title || '' : '';
      sitemap.push({
        slug,
        title,
        children: [],
      });
    }
  });
  slugs.forEach((slug: string) => {
    const pathMap = exportPathMap[slug];
    if (pathMap.query) {
      const tmp = pathMap.page.split('/');
      const resourceType = tmp[1];
      const res = resource.get(resourceType, pathMap.query.id);
      const title = res.data.title;
      const sm = sitemap.filter(sm => sm.slug === resourceType)[0] || null;
      if (sm) {
        sm.children.push({
          slug,
          title,
          children: [],
        });
      }
    }
  });
  return {
    pathname: data.pathname,
    sitemap,
  };
};

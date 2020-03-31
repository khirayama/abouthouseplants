import * as React from 'react';
import css from 'styled-jsx/css';
import Head from 'next/head';

import { config } from '../config';
import { SitemapNode } from '../utils/sitemap';
import { Link } from '../components/Link';

type BreadcrumbProps = {
  pathname: string;
  sitemap: SitemapNode[];
};

type SitemapItem = {
  slug: string;
  title: string;
};

const styles = css`
  .breadcrumb {
    font-size: 0.75rem;
    color: #666666;
    padding: 0 24px;
  }
  .breadcrumb-item {
    display: inline-block;
  }
  .breadcrumb-item + .breadcrumb-item:before {
    content: '>';
    margin: 0 8px;
  }
`;

export function getSitemapItems(pathname: string, sitemap: SitemapNode[]): SitemapItem[] {
  const paths = pathname.split('/').filter((path) => !!path);
  const targetName = paths[0];
  let sitemapItems: SitemapItem[] = [];

  for (const sm of sitemap) {
    if (sm.name === targetName) {
      sitemapItems.push({
        slug: sm.slug,
        title: sm.title,
      });
    }
    if (sm.children.length) {
      const newPaths = paths.slice(1, paths.length);
      const tmp = getSitemapItems(newPaths.join('/'), sm.children);
      sitemapItems = sitemapItems.concat(tmp);
    }
  }
  return sitemapItems;
}

export function Breadcrumb(props: BreadcrumbProps) {
  const sitemapItems: SitemapItem[] = getSitemapItems(props.pathname, props.sitemap);

  const ld: {
    '@context': 'https://schema.org';
    '@type': 'BreadcrumbList';
    itemListElement: {
      '@type': 'ListItem';
      position: number;
      name: string;
      item: string;
    }[];
  } = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [],
  };
  for (let i = 0; i < sitemapItems.length; i += 1) {
    const sitemapItem = sitemapItems[i];
    ld.itemListElement.push({
      '@type': 'ListItem',
      position: i + 1,
      name: sitemapItem.title,
      item: `${config.host}${sitemapItem.slug}`,
    });
  }

  return (
    <>
      <style jsx>{styles}</style>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </Head>
      <ul className="breadcrumb">
        {sitemapItems.map((sitemapItem) => (
          <li key={sitemapItem.slug} className="breadcrumb-item">
            <Link to={sitemapItem.slug}>{sitemapItem.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

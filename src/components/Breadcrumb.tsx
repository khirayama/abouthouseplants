import * as React from 'react';
import css from 'styled-jsx/css';

import { SitemapNode } from '../utils/sitemap';
import { Link } from '../components/Link';

type BreadcrumbProps = {
  pathname: string;
  sitemap: SitemapNode[];
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

export function Breadcrumb(props: BreadcrumbProps) {
  const paths = props.pathname.split('/').filter(path => path);

  const indexSitemap = props.sitemap.filter(sm => sm.name === 'index')[0];
  const sitemapItems: { slug: string; title: string }[] = [
    {
      slug: indexSitemap.slug,
      title: indexSitemap.title,
    },
  ];
  let sm = props.sitemap;
  paths.forEach(path => {
    const tmp = sm.filter(tmp => tmp.name === path)[0] || null;
    if (tmp !== null) {
      sitemapItems.push({ slug: tmp.slug, title: tmp.title });
      sm = tmp.children;
    }
  });

  return (
    <>
      <style jsx>{styles}</style>
      <ul className="breadcrumb">
        {sitemapItems.map(sitemapItem => (
          <li key={sitemapItem.slug} className="breadcrumb-item">
            <Link to={sitemapItem.slug}>{sitemapItem.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

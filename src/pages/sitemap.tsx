import * as React from 'react';
import css from 'styled-jsx/css';

import nextConfig from '../../next.config';

import { config as siteConfig } from '../config';
import { resource, Resource, NoteResourceData } from '../utils/resource';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from '../components/Link';

export const data = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [],
};

export const config = { amp: true };

type SitemapPageProps = {
  pathname: string;
  pathMaps: {
    slug: string;
    title: string;
  }[];
};

const styles = css``;

export default function SitemapPage(props: SitemapPageProps) {
  return (
    <>
      <style jsx>{styles}</style>
      <Layout
        title={`サイトマップ | ${siteConfig.name}`}
        description={`${siteConfig.name}のサイトマップ`}
        keywords={['サイトマップ', siteConfig.name]}
      >
        <Header pathname={props.pathname} />
        <ul>
          {props.pathMaps.map(pathMap => {
            return (
              <li>
                <Link to={pathMap.slug}>{pathMap.title}</Link>
              </li>
            );
          })}
        </ul>
        <Footer />
      </Layout>
    </>
  );
}

SitemapPage.getInitialProps = (data: any): SitemapPageProps => {
  const pathMaps: any = [];
  const exportPathMap: any = nextConfig.exportPathMap();

  const paths = Object.keys(exportPathMap)
    .sort((a: string, b: string) => {
      return a.split('/').length - b.split('/').length;
    })
    .filter(path => path !== 'sitemap');
  paths.forEach((path: string) => {
    const page = exportPathMap[path];
    let title = '';
    if (!page.query) {
      const { data } = require(`.${page.page}`);
      title = data ? data.title || '' : '';
    } else {
      const tmp = page.page.split('/');
      const res = resource.get(tmp[1], page.query.id);
      title = res.data.title;
    }
    pathMaps.push({
      slug: path,
      title,
    });
  });
  return {
    pathname: data.pathname,
    pathMaps,
  };
};

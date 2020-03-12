import * as React from 'react';
import css from 'styled-jsx/css';

import { config as siteConfig } from '../config';
import { resource, Resource, NoteResourceData } from '../utils/resource';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FeaturedNote } from '../components/FeaturedNote';

export const config = { amp: true };

export const data = {
  title: `ノート | ${siteConfig.name}`,
  description: siteConfig.description,
  keywords: [],
};

type IndexPageProps = {
  pathname: string;
  resource: {
    intro: Resource<NoteResourceData>;
    labels: Resource[];
  };
};

const styles = css`
  .featured-note-container {
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
        <div className="featured-note-container">
          <FeaturedNote note={intro} />
        </div>
        <Footer />
      </Layout>
    </>
  );
}

IndexPage.getInitialProps = (data: any): IndexPageProps => {
  const intro = resource.get<NoteResourceData>('notes', 'introduction');
  const labels = resource.getCollection('labels', intro.data.labels);

  return {
    pathname: data.pathname,
    resource: {
      intro,
      labels,
    },
  };
};

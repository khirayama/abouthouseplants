import * as React from 'react';
import css from 'styled-jsx/css';

import { config as siteConfig } from '../../config';
import { resource, Resource, NoteResourceData } from '../../utils/resource';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { Footer } from '../../components/Footer';

export const config = { amp: true };

type PostPageProps = {
  pathname: string;
  resource: {
    note: Resource<NoteResourceData>;
    labels: Resource[];
  };
};

const styles = css`
  .note-container {
    padding: 24px;
  }

  .note-contents {
    padding: 24px 0;
  }
`;

export default function PostPage(props: PostPageProps) {
  const note = props.resource.note;
  const labels = props.resource.labels.map(label => label.data.title);

  return (
    <>
      <style jsx>{styles}</style>
      <Layout title={siteConfig.name} description={note.data.description} keywords={labels}>
        <Header pathname={props.pathname} />
        <section className="note-container">
          <Heading>{note.data.title}</Heading>
          <section className="note-contents">{note.contents}</section>
        </section>
        <Footer />
      </Layout>
    </>
  );
}

PostPage.getInitialProps = (data: any): PostPageProps => {
  const id = data.query.id;
  const note = resource.get<NoteResourceData>('notes', id);
  const labels = resource.getCollection('labels', note.data.labels);

  return {
    pathname: data.pathname,
    resource: {
      note,
      labels,
    },
  };
};

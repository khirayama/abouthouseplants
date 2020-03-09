import * as React from 'react';

import { resource, Resource, NoteResourceData } from '../utils/resource';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Link } from '../components/Link';

export const config = { amp: true };

type IndexPageProps = {
  pathname: string;
  resource: {
    intro: Resource<NoteResourceData>;
    introLabels: Resource[];
  };
};

export default function IndexPage(props: IndexPageProps) {
  const intro = props.resource.intro;
  const introLabels = props.resource.introLabels.map(introLabel => introLabel.data.title);

  return (
    <Layout title={intro.data.title} description={intro.data.description} keywords={introLabels}>
      <Header pathname={props.pathname} />
      <Link to={intro.slug}>
        <h3>{props.resource.intro.data.title}</h3>
      </Link>
    </Layout>
  );
}

IndexPage.getInitialProps = (props: any): IndexPageProps => {
  const intro = resource.get<NoteResourceData>('notes', 'introduction');
  const introLabels = resource.getCollection('labels', intro.data.labels);

  return {
    pathname: props.pathname,
    resource: {
      intro,
      introLabels,
    },
  };
};

import * as React from 'react';
import Link from 'next/link';

import { resource, Resource } from '../utils/resource';

export const config = { amp: true };

type IndexPageProps = {
  resource: {
    introduction: Resource;
  };
};

export default function HomePage(props: IndexPageProps) {
  console.log(props.resource.introduction);

  const intro = props.resource.introduction;

  return (
    <div>
      <h1>Index Page</h1>
      <Link href={intro.slug}>
        <a>
          <h3>{props.resource.introduction.data.title}</h3>
        </a>
      </Link>
    </div>
  );
}

HomePage.getInitialProps = (): IndexPageProps => {
  return {
    resource: {
      introduction: resource.get('notes', 'introduction'),
    },
  };
};

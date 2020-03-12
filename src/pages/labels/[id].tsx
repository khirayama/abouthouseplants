import * as React from 'react';
import Link from 'next/link';

import { Resource, ResourceShape } from '../../utils/Resource';

export const config = { amp: true };

type PostPageProps = {
  resource: ResourceShape;
};

export default function PostPage(props: PostPageProps) {
  return (
    <div>
      <h1>Post Page</h1>
      <p>{props.resource.id}</p>
      <p>{props.resource.type}</p>
      <p>{props.resource.contents}</p>
      <Link href="/">
        <a>to Index Page</a>
      </Link>
    </div>
  );
}

PostPage.getInitialProps = (data: any): PostPageProps => {
  const id = data.query.id;
  const res = Resource.findOne('labels', id);
  return { resource: res };
};

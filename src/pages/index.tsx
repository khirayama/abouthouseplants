import * as React from 'react';
import Link from 'next/link';

type IndexPageProps = {
  message: string;
};

export const config = { amp: true };

export default function HomePage(props: IndexPageProps) {
  return (
    <div>
      <h1>Index Page</h1>
      <p>{props.message}</p>
      <Link href="/new">to New Page</Link>
      <amp-img src="/profile.png" width="300" height="300" />
    </div>
  );
}

HomePage.getInitialProps = (): IndexPageProps => {
  const { data } = require('../init-data');
  return data;
};

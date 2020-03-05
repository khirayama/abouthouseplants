import * as React from 'react';
import Link from 'next/link';

type NewPageProps = {
  message: string;
};

export const config = { amp: true };

export default function NewPage(props: NewPageProps) {
  return (
    <div>
      <h1>New Page</h1>
      <p>{props.message}</p>
      <Link href="/">to Index Page</Link>
      <amp-img src="/profile.png" width="300" height="300" />
    </div>
  );
}

NewPage.getInitialProps = (): NewPageProps => {
  return { message: 'ok' };
};

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
    </div>
  );
}

NewPage.getInitialProps = (): NewPageProps => {
  return { message: 'ok' };
};

import Link from 'next/link'

export const config = { amp: true }

export default function NewPage(props: { message: string }) {
  return (
    <div>
      <h1>New Page</h1>
      <p>{props.message}</p>
      <Link href="/">to Index Page</Link>
      <amp-img src="/profile.png" width="300" height="300" />
    </div>
    );
}

NewPage.getInitialProps = () => {
  const { data } = require('../init-data');
  return data;
}

import Link from 'next/link'

export const config = { amp: true }

export default function HomePage() {
  console.log('try');
  const { data } = require('../init-data');
  console.log(data);

  return (
    <div>
      <h1>Index Page</h1>
      <p>{data.message}</p>
      <Link href="/new">to New Page</Link>
      <amp-img src="/profile.png" width="300" height="300" />
    </div>
    );
}

import * as React from 'react';
import css from 'styled-jsx/css';

import { config as siteConfig } from '../../config';
import { Resource, ResourceShape, MemoResourceData } from '../../utils/Resource';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { Footer } from '../../components/Footer';

export const config = { amp: true };

type PostPageProps = {
  pathname: string;
  resource: {
    memo: ResourceShape<MemoResourceData>;
  };
};

const styles = css`
  .memo-container {
    padding: 24px;
  }

  .memo-contents {
    padding: 24px 0;
  }
`;

export default function PostPage(props: PostPageProps) {
  const memo = props.resource.memo;

  return (
    <>
      <style jsx>{styles}</style>
      <Layout title={siteConfig.name} description={memo.data.description} keywords={[]}>
        <Header pathname={props.pathname} />
        <section className="memo-container">
          <Heading>{memo.data.title}</Heading>
          <section className="memo-contents">{memo.contents}</section>
        </section>
        <Footer />
      </Layout>
    </>
  );
}

PostPage.getInitialProps = (data: any): PostPageProps => {
  const id = data.query.id;
  const memo = Resource.findOne<MemoResourceData>('memos', id);

  return {
    pathname: data.pathname,
    resource: {
      memo,
    },
  };
};

import * as React from 'react';
import css from 'styled-jsx/css';
import dayjs from 'dayjs';

import { Resource, ResourceShape } from '../../utils/Resource';
import { generateSitemap, SitemapNode } from '../../utils/sitemap';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Footer } from '../../components/Footer';

export const config = { amp: true };

type PostPageProps = {
  pathname: string;
  sitemap: SitemapNode[];
  resource: {
    memo: ResourceShape;
  };
};

const styles = css`
  .container {
    padding: 24px;
  }

  .date {
    font-size: 0.75rem;
    font-family: serif;
    color: #666666;
  }
  .date-label {
    margin-right: 0.5rem;
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
      <Layout {...memo.data.seo}>
        <Header pathname={props.pathname} />
        <Breadcrumb pathname={props.pathname} sitemap={props.sitemap} />
        <section className="container">
          <Heading>{memo.data.title}</Heading>
          <div className="date">
            <span className="date-label">作成日</span>
            <time dateTime={memo.data.created}>{dayjs(memo.data.created).format('YYYY年MM月DD日')}</time>
          </div>
          <div className="date">
            <span className="date-label">最終更新日</span>
            <time dateTime={memo.data.updated}>{dayjs(memo.data.updated).format('YYYY年MM月DD日')}</time>
          </div>
          <section className="memo-contents">{memo.contents}</section>
        </section>
        <Footer />
      </Layout>
    </>
  );
}

PostPage.getInitialProps = (data: any): PostPageProps => {
  const id = data.query.id;
  const memo = Resource.findOne('memos', id);

  return {
    pathname: data.req.url,
    sitemap: generateSitemap(),
    resource: {
      memo,
    },
  };
};

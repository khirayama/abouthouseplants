import * as React from 'react';
import css from 'styled-jsx/css';
import dayjs from 'dayjs';

import { config as siteConfig } from '../config';
import { Resource, ResourceShape, ResourceData } from '../utils/Resource';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Heading } from '../components/Heading';
import { Footer } from '../components/Footer';
import { Link } from '../components/Link';

export const config = { amp: true };

export const data: ResourceData = {
  title: `${siteConfig.name}のメモ一覧`,
  description: `${siteConfig.name}のメモを網羅的に閲覧できる。`,
  thumbnail: '',
  seo: {
    title: `${siteConfig.name}のメモ一覧`,
    description: `${siteConfig.name}のメモを網羅的に閲覧できる。`,
    thumbnail: '',
    keywords: ['観葉植物', '入門', '基礎知識', '選び方', '育て方'],
  },
  created: '2020-03-12T18:00:00.000+09:00',
  updated: '2020-03-22T09:00:00.000+09:00',
};

type LabelsPageProps = {
  pathname: string;
  resource: {
    memos: ResourceShape[];
  };
};

const styles = css`
  .container {
    padding: 24px;
  }
  .memo-item {
    padding: 12px 0;
  }
  .memo-heading {
    font-family: serif;
    font-size: 1.25rem;
  }
  .memo-description {
    font-size: 0.75rem;
    color: #666;
  }
  .date {
    font-size: 0.75rem;
    font-family: serif;
    color: #666666;
  }
  .date-label {
    margin-right: 0.5rem;
  }
`;

export default function LabelsPage(props: LabelsPageProps) {
  const memos = props.resource.memos;

  return (
    <>
      <style jsx>{styles}</style>
      <Layout {...data.seo}>
        <Header pathname={props.pathname} />
        <div className="container">
          <Heading>{data.title}</Heading>
          <ul>
            {memos.map(memo => {
              return (
                <li key={memo.id} className="memo-item">
                  <Link to={memo.slug}>
                    <h2 className="memo-heading">{memo.data.title}</h2>
                    <div className="date">
                      <span className="date-label">作成日</span>
                      <time dateTime={memo.data.created}>{dayjs(memo.data.created).format('YYYY年MM月DD日')}</time>
                    </div>
                    <div className="date">
                      <span className="date-label">最終更新日</span>
                      <time dateTime={memo.data.updated}>{dayjs(memo.data.updated).format('YYYY年MM月DD日')}</time>
                    </div>
                    <p className="memo-description">{memo.data.description}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Footer />
      </Layout>
    </>
  );
}

LabelsPage.getInitialProps = (data: any): LabelsPageProps => {
  const memos = Resource.find('memos');

  return {
    pathname: data.req.url,
    resource: {
      memos,
    },
  };
};

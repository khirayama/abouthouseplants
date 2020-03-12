import * as React from 'react';
import css from 'styled-jsx/css';

import { Resource, MemoResourceData } from '../utils/resource';
import { Link } from '../components/Link';
import { Image } from '../components/Image';

type FeaturedMemoProps = {
  memo: Resource<MemoResourceData>;
};

const styles = css`
  .frame {
    display: inline-block;
    position: relative;
    border-radius: 8px;
    text-align: right;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
    width: 100%;
    max-width: 384px;
  }
  .image-wrapper {
    width: 100%;
    height: auto;
  }
  .info {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 12px;
    text-shadow: 0 0 8px #fff;
    z-index: 1;
  }
  .description {
    padding: 8px 0;
    font-size: 1rem;
  }
  .title {
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

export function FeaturedMemo(props: FeaturedMemoProps) {
  const memo = props.memo;

  return (
    <Link to={memo.slug}>
      <style jsx>{styles}</style>
      <div className="frame">
        <div className="image-wrapper">
          <Image src="/images/a-close-up-of-a-leaf-on-white-background.jpeg" />
        </div>
        <div className="info">
          <p className="description">{memo.data.description}</p>
          <h3 className="title">{memo.data.title}</h3>
        </div>
      </div>
    </Link>
  );
}

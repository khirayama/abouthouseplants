import * as React from 'react';
import css from 'styled-jsx/css';

import { Link } from '../components/Link';

type BreadcrumbProps = {
  pathname: string;
};

const styles = css`
  .breadcrumb {
    font-size: 0.75rem;
    color: #666666;
    padding: 0 24px;
  }
  .breadcrumb-item {
    display: inline-block;
  }
  .breadcrumb-item + .breadcrumb-item:before {
    content: '>';
    margin: 0 4px;
  }
`;

export function Breadcrumb(props: BreadcrumbProps) {
  const paths = props.pathname.split('/').filter(path => path);

  return (
    <>
      <style jsx>{styles}</style>
      <ul className="breadcrumb">
        {paths.map(path => (
          <li key={path} className="breadcrumb-item">
            <Link to={path}>{path}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

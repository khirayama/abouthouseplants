import * as React from 'react';
import css from 'styled-jsx/css';

import { config } from '../config';
import { Link } from '../components/Link';

type HeaderProps = {
  pathname: string;
};

const styles = css`
  .heading {
    font-size: 1.5rem;
    letter-spacing: 2px;
    font-family: serif;
    text-align: center;
    padding: 24px;
  }
  .sub-heading {
    font-size: 1rem;
    letter-spacing: 2px;
    font-family: serif;
    padding: 12px 24px;
  }
`;

export function Header(props: HeaderProps) {
  return (
    <>
      <style jsx>{styles}</style>
      <header>
        {props.pathname === '/' ? (
          <h1 className="heading">
            <Link to="/">{config.name}</Link>
          </h1>
        ) : (
          <h2 className="sub-heading">
            <Link to="/">{config.name}</Link>
          </h2>
        )}
      </header>
    </>
  );
}

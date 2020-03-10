import * as React from 'react';
import css from 'styled-jsx/css';

import { config } from '../config';
import { Link } from '../components/Link';

type HeaderProps = {
  pathname: string;
};

const styles = css`
  .header {
    padding: 28px;
    text-align: center;
  }
  .heading {
    font-size: 1.5rem;
    letter-spacing: 2px;
    font-family: serif;
  }
`;

export function Header(props: HeaderProps) {
  return (
    <>
      <style jsx>{styles}</style>
      <header className="header">
        <Link to="/">
          {props.pathname === '/' ? (
            <h1 className="heading">{config.name}</h1>
          ) : (
            <h2 className="heading">{config.name}</h2>
          )}
        </Link>
      </header>
    </>
  );
}

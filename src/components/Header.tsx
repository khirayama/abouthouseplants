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
  }
  .heading {
    font-size: 1.5rem;
    letter-spacing: 2px;
    font-family: serif;
    text-align: center;
  }
  .sub-heading {
    font-size: 1rem;
    letter-spacing: 2px;
    font-family: serif;
  }
`;

export function Header(props: HeaderProps) {
  return (
    <>
      <style jsx>{styles}</style>
      <header className="header">
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

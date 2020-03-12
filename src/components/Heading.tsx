import * as React from 'react';
import css from 'styled-jsx/css';

const styles = css`
  .heading {
    padding: 8px 0 24px;
    font-size: 1.5rem;
    font-family: serif;
  }
`;

type HeadingProps = {
  children: React.ReactNode;
};

export function Heading(props: HeadingProps) {
  return (
    <>
      <style jsx>{styles}</style>
      <h1 className="heading">{props.children}</h1>
    </>
  );
}

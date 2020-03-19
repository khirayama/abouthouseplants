import * as React from 'react';
import css from 'styled-jsx/css';

const heading2Styles = css`
  .remark-heading2 {
    margin: 64px 0 24px;
    font-size: 1.25rem;
  }
`;

type RemarkHeading2Props = {
  children: React.ReactNode;
};

export function RemarkHeading2(props: RemarkHeading2Props) {
  return (
    <>
      <style jsx>{heading2Styles}</style>
      <h2 {...props} className="remark-heading2">
        {props.children}
      </h2>
    </>
  );
}

const heading3Styles = css`
  .remark-heading3 {
    margin: 24px 0 16px;
    font-size: 1.125rem;
  }
`;

type RemarkHeading3Props = {
  children: React.ReactNode;
};

export function RemarkHeading3(props: RemarkHeading3Props) {
  return (
    <>
      <style jsx>{heading3Styles}</style>
      <h3 {...props} className="remark-heading3">
        {props.children}
      </h3>
    </>
  );
}

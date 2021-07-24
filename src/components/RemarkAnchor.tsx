import * as React from 'react';
import { css } from 'styled-jsx/css';

const styles = css`
  .remark-anchor {
    text-decoration: underline;
    margin: 0 2px;
  }
  .remark-anchor:focus {
    background: rgba(16, 172, 255, 0.3);
  }
`;

type RemarkAnchorProps = {
  children: React.ReactNode;
};

export function RemarkAnchor(props: RemarkAnchorProps) {
  return (
    <>
      <style jsx>{styles}</style>
      <a className="remark-anchor" {...props}>
        {props.children}
      </a>
    </>
  );
}

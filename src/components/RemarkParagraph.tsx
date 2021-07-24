import * as React from 'react';
import { css } from 'styled-jsx/css';

const styles = css`
  .remark-paragraph {
    margin: 8px 0 16px;
    line-height: 2rem;
  }
  .remark-paragraph + .remark-paragraph {
    margin: 0 0 24px;
  }
`;

type RemarkParagraphProps = {
  children: React.ReactNode;
};

export function RemarkParagraph(props: RemarkParagraphProps) {
  return (
    <>
      <style jsx>{styles}</style>
      <p className="remark-paragraph">{props.children}</p>
    </>
  );
}

import * as React from 'react';
import css from 'styled-jsx/css';

const listStyles = css`
  .remark-list {
    margin: 8px 0 24px 1rem;
  }
  .remark-list :global(.remark-list) {
    margin: 8px 0 8px 1rem;
  }
`;

type RemarkListProps = {
  children: React.ReactNode;
};

export function RemarkList(props: RemarkListProps) {
  return (
    <>
      <style jsx>{listStyles}</style>
      <ul className="remark-list">{props.children}</ul>
    </>
  );
}

const listItemStyles = css`
  .remark-list-item {
    position: relative;
    line-height: 2rem;
  }
  .remark-list-item:before {
    position: absolute;
    left: -1rem;
    top: 0.75rem;
    content: '';
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #666666;
  }
  .remark-list-item :global(.remark-paragraph) {
    margin: 0;
  }
`;

type RemarkListItemProps = {
  children: React.ReactNode;
};

export function RemarkListItem(props: RemarkListItemProps) {
  return (
    <>
      <style jsx>{listItemStyles}</style>
      <li className="remark-list-item">{props.children}</li>
    </>
  );
}

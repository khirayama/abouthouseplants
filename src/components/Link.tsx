import * as React from 'react';
import NextLink from 'next/link';

type LinkProps = {
  to: string;
  children: React.ReactNode;
};

export function Link(props: LinkProps) {
  return (
    <NextLink href={props.to}>
      <a>{props.children}</a>
    </NextLink>
  );
}

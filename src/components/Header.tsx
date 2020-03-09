import * as React from 'react';
import styled from 'styled-components';

type HeaderProps = {
  pathname: string;
};

const Wrapper = styled.header`
  padding: 20px;
`;

export function Header(props: HeaderProps) {
  const headingContents = '観葉植物のこと。';
  const heading = props.pathname === '/' ? <h1>{headingContents}</h1> : <h2>{headingContents}</h2>;

  return <Wrapper>{heading}</Wrapper>;
}

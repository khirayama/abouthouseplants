import * as React from 'react';

type ImageProps = {
  src: string;
};

export function Image(props: ImageProps) {
  return <amp-img src={props.src} width={100} height={100} alt="test" />;
}

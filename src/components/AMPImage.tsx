import * as React from 'react';

type AMPImageProps = {
  src: string;
};

export function AMPImage(props: AMPImageProps) {
  // return <amp-img src={props.src} width={100} height={100} alt="test" />;
  return <amp-img src={props.src} />;
}

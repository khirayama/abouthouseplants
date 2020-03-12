import * as React from 'react';

type ImageProps = {
  src: string;
};

function extractName(imagePath: string): string {
  const tmp = imagePath.split('/');
  const fileName = tmp[tmp.length - 1];
  const tmp2 = fileName.split('.');
  tmp2.splice(tmp2.length - 1, 1);
  return tmp2.join('');
}

export function Image(props: ImageProps) {
  const name = extractName(props.src);
  const metadata = require(`../../public/images/${name}.json`);
  const src = props.src.replace(name, `${name}.1x`);
  const src2x = props.src.replace(name, `${name}.2x`);
  const src3x = props.src.replace(name, `${name}.3x`);
  const srcPlaceholder = props.src.replace(name, `${name}.placeholder`);
  const srcWebp = src.replace(`.${metadata.format}`, `.webp`);
  const src2xWebp = src2x.replace(`.${metadata.format}`, `.webp`);
  const src3xWebp = src3x.replace(`.${metadata.format}`, `.webp`);
  const srcPlaceholderWebp = srcPlaceholder.replace(`.${metadata.format}`, `.webp`);
  const srcset = `${src} 1x, ${src2x} 2x, ${src3x} 3x`;
  const srcsetWebp = `${srcWebp} 1x, ${src2xWebp} 2x, ${src3xWebp} 3x`;

  return (
    <amp-img
      src={srcWebp}
      srcset={srcsetWebp}
      alt={metadata.name}
      width={metadata.width}
      height={metadata.height}
      layout="responsive"
    >
      <amp-img
        placeholder
        src={srcPlaceholderWebp}
        alt={metadata.name}
        width={metadata.width}
        height={metadata.height}
        layout="responsive"
      ></amp-img>
      <amp-img
        fallback=""
        src={src}
        srcset={srcset}
        alt={metadata.name}
        width={metadata.width}
        height={metadata.height}
        layout="responsive"
      >
        <amp-img
          placeholder
          src={srcPlaceholder}
          alt={metadata.name}
          width={metadata.width}
          height={metadata.height}
          layout="responsive"
        ></amp-img>
      </amp-img>
    </amp-img>
  );
}

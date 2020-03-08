import * as fs from 'fs';
import * as path from 'path';

import sharp from 'sharp';
import glob from 'glob';

// 基準サイズ - 768px
// Twitter, Facebook - 1200px x 630px, 630px x 630px
// Placeholder - 12px
//
// 出力
// meta
//   width, height, name, format
// format
//   png, jpg, webp
// size
//   12px, 1x, 2x, 3x

type Metadata = {
  name: string;
  format: string;
  width: number | null;
  height: number | null;
};

function extractName(imagePath: string): string {
  const tmp = imagePath.split('/');
  const fileName = tmp[tmp.length - 1];
  const tmp2 = fileName.split('.');
  tmp2.splice(tmp2.length - 1, 1);
  return tmp2.join('');
}

function extractDir(imagePath: string): string {
  const tmp = imagePath.split('/');
  tmp.splice(tmp.length - 1, 1);
  return tmp.map((p: string) => (p === 'materials' ? 'public' : p)).join('/');
}

async function getMetadata(imagePath: string): Promise<Metadata> {
  const metadata = await sharp(imagePath).metadata();
  const name = extractName(imagePath);
  const meta: Metadata = {
    name,
    format: metadata.format || '',
    width: metadata.width || null,
    height: metadata.height || null,
  };
  return meta;
}

async function generateImages(imagePath: string, metadata: Metadata): Promise<void> {
  // input: png, jpeg and other image
  // output(side effect): original format(placeholder, 1x, 2x, 3x) and webp(placeholder, 1x, 2x, 3x)
  const defaultWidth = 768;
  const placeholderWidth = 12;
  console.log(metadata);

  const dir = extractDir(imagePath);

  fs.writeFileSync(`${dir}/${metadata.name}.json`, JSON.stringify(metadata));

  if (metadata.format === 'png') {
    const options = { progressive: true, quality: 70 };
    const image = sharp(imagePath);
    await image
      .resize({ width: defaultWidth * 3 })
      .png(options)
      .toFile(`${dir}/${metadata.name}.3x.${metadata.format}`);
    await image
      .resize({ width: defaultWidth * 2 })
      .png(options)
      .toFile(`${dir}/${metadata.name}.2x.${metadata.format}`);
    await image
      .resize({ width: defaultWidth * 1 })
      .png(options)
      .toFile(`${dir}/${metadata.name}.1x.${metadata.format}`);
    await image
      .resize({ width: placeholderWidth })
      .png(options)
      .grayscale()
      .toFile(`${dir}/${metadata.name}.placeholder.${metadata.format}`);
  }
  if (metadata.format === 'jpeg') {
    const options = { progressive: true, quality: 70 };
    const image = sharp(imagePath);
    await image
      .resize({ width: defaultWidth * 3 })
      .jpeg(options)
      .toFile(`${dir}/${metadata.name}.3x.${metadata.format}`);
    await image
      .resize({ width: defaultWidth * 2 })
      .jpeg(options)
      .toFile(`${dir}/${metadata.name}.2x.${metadata.format}`);
    await image
      .resize({ width: defaultWidth * 1 })
      .jpeg(options)
      .toFile(`${dir}/${metadata.name}.1x.${metadata.format}`);
    await image
      .resize({ width: placeholderWidth })
      .jpeg(options)
      .grayscale()
      .toFile(`${dir}/${metadata.name}.placeholder.${metadata.format}`);
  }

  const options = { quality: 70 };
  const image = sharp(imagePath);
  await image
    .resize({ width: defaultWidth * 3 })
    .toFormat('webp')
    .webp(options)
    .toFile(`${dir}/${metadata.name}.3x.webp`);
  await image
    .resize({ width: defaultWidth * 2 })
    .toFormat('webp')
    .webp(options)
    .toFile(`${dir}/${metadata.name}.2x.webp`);
  await image
    .resize({ width: defaultWidth * 1 })
    .toFormat('webp')
    .webp(options)
    .toFile(`${dir}/${metadata.name}.1x.webp`);
  await image
    .resize({ width: placeholderWidth })
    .grayscale()
    .toFormat('webp')
    .webp(options)
    .toFile(`${dir}/${metadata.name}.placeholder.webp`);
}

(async () => {
  const rootPath = path.join(process.cwd(), 'materials', 'images');
  const imagePaths = glob.sync(`${rootPath}/**/*.{png,jpg,jpeg}`);

  imagePaths.forEach(async imagePath => {
    const metadata = await getMetadata(imagePath);
    await generateImages(imagePath, metadata);
  });
})();

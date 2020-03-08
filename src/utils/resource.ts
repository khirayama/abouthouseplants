import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import grayMatter from 'gray-matter';
import remark from 'remark';
import remark2react from 'remark-react';

import { AMPImage } from '../components/AMPImage';

export type Resource = {
  id: string;
  slug: string;
  type: string;
  data: {
    [key: string]: string;
  };
  contents: React.ReactNode;
};

export const resource = {
  get: (type: string, id: string) => {
    const mdPath = path.join(process.cwd(), 'resources', type, `${id}.md`);
    const doc = fs.readFileSync(mdPath, { encoding: 'utf-8' });
    const res = grayMatter(doc);
    const slug = `/${type}/${id}`;

    const result = remark()
      .use(remark2react, {
        remarkReactComponents: {
          img: AMPImage,
        },
      })
      .processSync(res.content);
    return {
      id,
      slug,
      type,
      data: res.data,
      contents: result.contents,
    };
  },
};

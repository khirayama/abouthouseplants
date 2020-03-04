import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import grayMatter from 'gray-matter';
import remark from 'remark';
import remark2react from 'remark-react';

export type Resource = {
  id: string;
  type: string;
  data: {
    [key: string]: string;
  };
  contents: React.ReactNode;
};

export const resource = {
  get: (type: string, id: string) => {
    const mdPath = path.join(process.cwd(), 'resources', type, id, 'index.md');
    const doc = fs.readFileSync(mdPath, { encoding: 'utf-8' });
    const res = grayMatter(doc);

    const result = remark()
      .use(remark2react, {
        remarkReactComponents: {
          img: 'amp-img',
        },
      })
      .processSync(res.content);
    return {
      id,
      type,
      data: res.data,
      contents: result.contents,
    };
  },
};

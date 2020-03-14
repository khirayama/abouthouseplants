import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import grayMatter from 'gray-matter';
import remark from 'remark';
import remark2react from 'remark-react';

import { Image } from '../components/Image';

export type MemoResourceData = {
  labels: string[];
};

export type ResourceData<T> = {
  title: string;
  description: string;
  created: string;
  updated: string;
} & T;

export type ResourceShape<T = {}> = {
  id: string;
  slug: string;
  type: string;
  data: ResourceData<T>;
  contents: React.ReactNode;
};

export class Resource {
  private static get<T = {}>(type: string, id: string): ResourceShape<T> {
    const mdPath = path.join(process.cwd(), 'resources', type, `${id}.md`);
    const doc = fs.readFileSync(mdPath, { encoding: 'utf-8' });
    const res = grayMatter(doc);
    const data = res.data as ResourceData<T>;
    const slug = `/${type}/${id}`;

    const result = remark()
      .use(remark2react, {
        remarkReactComponents: {
          img: Image,
        },
      })
      .processSync(res.content);

    return {
      id,
      slug,
      type,
      data,
      contents: result.contents,
    };
  }

  public static find<T = {}>(type: string, ids: string[]): ResourceShape<T>[] {
    return ids.map(id => Resource.get<T>(type, id));
  }

  public static findOne<T = {}>(type: string, id: string): ResourceShape<T> {
    return Resource.get<T>(type, id);
  }
}
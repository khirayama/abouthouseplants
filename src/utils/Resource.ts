import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import grayMatter from 'gray-matter';
import remark from 'remark';
import remark2react from 'remark-react';

import { RemarkImage } from '../components/RemarkImage';
import { RemarkHeading2, RemarkHeading3 } from '../components/RemarkHeading';
import { RemarkParagraph } from '../components/RemarkParagraph';
import { RemarkAnchor } from '../components/RemarkAnchor';
import { RemarkList, RemarkListItem } from '../components/RemarkList';
import {
  RemarkTable,
  RemarkTableBody,
  RemarkTableHead,
  RemarkTableRow,
  RemarkTableHeader,
  RemarkTableData,
} from '../components/RemarkTable';

const components = {
  h2: RemarkHeading2,
  h3: RemarkHeading3,
  img: RemarkImage,
  p: RemarkParagraph,
  ul: RemarkList,
  li: RemarkListItem,
  table: RemarkTable,
  thead: RemarkTableHead,
  tbody: RemarkTableBody,
  tr: RemarkTableRow,
  th: RemarkTableHeader,
  td: RemarkTableData,
  a: RemarkAnchor,
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
        remarkReactComponents: components,
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

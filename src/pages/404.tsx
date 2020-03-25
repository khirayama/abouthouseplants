import * as React from 'react';

import { config as siteConfig } from '../config';
import { ResourceData } from '../utils/Resource';

export const data: ResourceData = {
  title: `今現在、${siteConfig.name}では、お探しのものがありません。`,
  description: '',
  thumbnail: '',
  seo: {
    title: `今現在、${siteConfig.name}では、お探しのものがありません。`,
    description: '',
    thumbnail: '',
    keywords: ['観葉植物', '入門', '基礎知識', '選び方', '育て方'],
  },
  created: '2020-03-12T18:00:00.000+09:00',
  updated: '2020-03-26T09:00:00.000+09:00',
};

export default function Custom404page() {
  return <h1>404 {data.title}</h1>;
}

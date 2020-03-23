import * as React from 'react';

import { config as siteConfig } from '../config';
import { ResourceData } from '../utils/Resource';

export const data: ResourceData = {
  title: 'お探しのものが見つかりません。',
  description: '選び方、育て方など入門から、飾り方、増やし方など楽しみ方まで',
  thumbnail: '',
  seo: {
    title: `${siteConfig.name} - 選び方、育て方など入門から、飾り方、増やし方など楽しみ方まで`,
    description: '選び方、育て方など入門から、飾り方、増やし方など楽しみ方まで',
    thumbnail: '',
    keywords: ['観葉植物', '入門', '基礎知識', '選び方', '育て方'],
  },
  created: '2020-03-12T18:00:00.000+09:00',
  updated: '2020-03-23T09:00:00.000+09:00',
};

export default function Custom404page() {
  return <h1>404 - Page Not Found</h1>;
}

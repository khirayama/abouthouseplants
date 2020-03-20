import * as path from 'path';
import glob from 'glob';

import { Resource } from './Resource';

export type SitemapNode = {
  slug: string;
  name: string;
  title: string;
  file: string;
  children: SitemapNode[];
};

function isTemplate(pagePath: string): boolean {
  return pagePath.indexOf('[id]') !== -1;
}

export function generateSitemap(): SitemapNode[] {
  const sitemap: SitemapNode[] = [];

  /* Page */
  const resourceFileRootPath = path.join(process.cwd(), 'resources');
  const pageFileRootPath = path.join(process.cwd(), 'src', 'pages');
  const pageFilePaths = glob.sync(`${pageFileRootPath}/**/*.tsx`);

  for (const pageFilePath of pageFilePaths) {
    if (!isTemplate(pageFilePath)) {
      const pageName = pageFilePath
        .replace(pageFileRootPath, '')
        .replace('.tsx', '')
        .split('/')
        .filter(tmp => !!tmp)[0];
      const { data } = require(`../pages/${pageName}`);
      const slug = ['', pageName].join('/');

      sitemap.push({
        slug,
        name: pageName,
        title: data.title,
        file: slug,
        children: [],
      });
    } else {
      const resourceType = pageFilePath
        .replace(pageFileRootPath, '')
        .replace('.tsx', '')
        .split('/')
        .filter(tmp => !!tmp)[0];
      const resourceTypeFilePathRoot = path.join(resourceFileRootPath, resourceType);
      const resourceFilePaths = glob.sync(`${resourceTypeFilePathRoot}/**/*.md`);
      const resourceIds = resourceFilePaths.map(resourceFilePath => {
        return resourceFilePath
          .replace(resourceTypeFilePathRoot, '')
          .replace('.md', '')
          .split('/')
          .filter(tmp => !!tmp)[0];
      });
      for (const resourceId of resourceIds) {
        const parentSitemapNode = sitemap.filter(sm => sm.slug === ['', resourceType].join('/'))[0];
        const slug = ['', resourceType, resourceId].join('/');
        const resource = Resource.findOne(resourceType, resourceId);
        parentSitemapNode.children.push({
          slug,
          name: resourceId,
          title: resource.data.title,
          file: slug,
          children: [],
        });
      }
    }
  }

  return sitemap;
}

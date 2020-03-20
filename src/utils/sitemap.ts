import * as path from 'path';
import glob from 'glob';

import nextConfig from '../../next.config';

import { Resource } from '../utils/Resource';

type PathMap = {
  [slug: string]: {
    page: string;
    query?: { id: string };
  };
};

export type SitemapNode = {
  slug: string;
  name: string;
  title: string;
  children: SitemapNode[];
};

function isTemplate(pagePath: string): boolean {
  return pagePath.indexOf('[id]') !== -1;
}

export function generateSitemap(): SitemapNode[] {
  // const sitemap: SitemapNode[] = [];
  // const exportPathMap: PathMap = nextConfig.exportPathMap() as PathMap;
  //
  // const slugs = Object.keys(exportPathMap)
  //   .sort((a: string, b: string) => {
  //     return a.split('/').length - b.split('/').length;
  //   })
  //   .filter(slug => slug !== 'sitemap');
  //
  // slugs.forEach((slug: string) => {
  //   const pathMap = exportPathMap[slug];
  //   if (!pathMap.query) {
  //     const { data } = require(`.${pathMap.page}`);
  //     const title = data?.title || '';
  //     sitemap.push({
  //       slug,
  //       title,
  //       children: [],
  //     });
  //   }
  // });
  //
  // slugs.forEach((slug: string) => {
  //   const pathMap = exportPathMap[slug];
  //   if (pathMap.query) {
  //     const tmp = pathMap.page.split('/');
  //     const resourceType = tmp[1];
  //     const res = Resource.findOne(resourceType, pathMap.query.id);
  //     const title = res.data.title;
  //     const sm = sitemap.filter(sm => sm.slug === resourceType)[0] || null;
  //     if (sm) {
  //       sm.children.push({
  //         slug,
  //         title,
  //         children: [],
  //       });
  //     }
  //   }
  // });
  // // Change Order
  // sitemap.sort(sm => (sm.slug === '/' ? -1 : 0));

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

      sitemap.push({
        slug: ['', pageName].join('/'),
        name: pageName,
        title: data.title,
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
          children: [],
        });
      }
    }
  }

  return sitemap;
}

import * as fs from 'fs';
import * as path from 'path';

import glob from 'glob';
import dayjs from 'dayjs';

import { config } from '../config';
import { Resource } from './Resource';

export type SitemapNode = {
  slug: string;
  name: string;
  title: string;
  file: string;
  updated: string;
  children: SitemapNode[];
};

export type SitemapXMLItem = {
  slug: string;
  lastmod: string;
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
      let pageName = pageFilePath
        .replace(pageFileRootPath, '')
        .replace('.tsx', '')
        .split('/')
        .filter(tmp => !!tmp)[0];
      const { data } = require(`../pages/${pageName}`);
      let slug = ['', pageName].join('/');
      slug = slug === '/index' ? '/' : slug;

      sitemap.push({
        slug,
        name: pageName,
        title: data.title,
        file: slug,
        updated: dayjs(Date.now()).format('YYYY-MM-DD'),
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
          updated: dayjs(resource.data.updated).format('YYYY-MM-DD'),
          children: [],
        });
      }
    }
  }

  return sitemap;
}

export function getSitemapXMLItems(sitemap: SitemapNode[]): SitemapXMLItem[] {
  let sitemapXMLItems: SitemapXMLItem[] = [];

  for (const sm of sitemap) {
    sitemapXMLItems.push({
      slug: sm.slug,
      lastmod: sm.updated,
    });

    if (sm.children.length) {
      const tmp = getSitemapXMLItems(sm.children);
      sitemapXMLItems = sitemapXMLItems.concat(tmp);
    }
  }
  return sitemapXMLItems;
}

export function generateSitemapXML(sitemap: SitemapNode[]) {
  const sitemapXMLItems: { slug: string; lastmod: string }[] = getSitemapXMLItems(sitemap);
  console.log(sitemapXMLItems);

  const XMLSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  ${sitemapXMLItems
    .map(sitemapXMLItem => {
      return `
<url>
  <loc>${config.host + sitemapXMLItem.slug}</loc>
  <lastmod>${sitemapXMLItem.lastmod}</lastmod>
</url>`;
    })
    .join('')}
</urlset>`;
  return XMLSitemap;
}

export function saveSitemap(XMLSitemap: string) {
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), XMLSitemap);
}

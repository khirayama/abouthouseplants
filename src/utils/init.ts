import { generateSitemap, generateSitemapXML, saveSitemap } from './sitemap';

export function init() {
  console.log('--- Start Initilize---');
  const sitemap = generateSitemap();
  const sitemapXML = generateSitemapXML(sitemap);
  saveSitemap(sitemapXML);
  console.log('--- End Initilize ---');
}

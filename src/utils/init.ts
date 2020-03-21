import { generateSitemap, generateSitemapXML, saveSitemap } from './sitemap';
import { generateRobotsTxt, saveRobotsTxt } from './robots';

export function init() {
  console.log('--- Start Initilize---');
  /* sitemap.xml */
  const sitemap = generateSitemap();
  const sitemapXML = generateSitemapXML(sitemap);
  saveSitemap(sitemapXML);
  /* robots.txt */
  const robotsTxt = generateRobotsTxt();
  saveRobotsTxt(robotsTxt);
  console.log('--- End Initilize ---');
}

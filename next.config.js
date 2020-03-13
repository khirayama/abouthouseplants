const fs = require('fs');
const path = require('path');

const glob = require('glob');

function generateSitemapXMLFromExportPathMap(exportPathMap) {
  const host = 'https://www.abouthouseplants.com/';
  const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  ${Object.keys(exportPathMap)
    .map(slug => {
      return `<url>
  <loc>${(host + slug).replace('.com//', '.com/')}</loc>
</url>`;
    })
    .join('')}
</urlset>`;
  return xmlSitemap;
}

function saveSitemap(xmlSitemal) {
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xmlSitemal);
}

module.exports = {
  webpack: config => {
    return Object.assign({}, config, {
      node: {
        fs: 'empty',
      },
    });
  },
  exportPathMap: () => {
    const exportPathMap = {};

    const resourceTypes = [];

    const resourceRootPath = path.join(process.cwd(), 'resources');
    const resourcePaths = glob
      .sync(`${resourceRootPath}/**/*.md`)
      .map(p => p.replace(resourceRootPath, '').replace('.md', ''));
    resourcePaths.forEach(resourcePath => {
      const resourceType = resourcePath.split('/')[1];
      resourceTypes.push(resourceType);

      const resourceId = resourcePath.split('/')[2];
      exportPathMap[resourcePath] = { page: `/${resourceType}/[id]`, query: { id: resourceId } };
    });

    const pageRootPath = path.join(process.cwd(), 'src', 'pages');
    const pagePaths = glob.sync(`${pageRootPath}/**/*.tsx`).map(p => p.replace(pageRootPath, '').replace('.tsx', ''));
    pagePaths.forEach(pagePath => {
      const pageName = pagePath.split('/')[1];
      if (pagePath.indexOf('[id]') === -1) {
        exportPathMap[pageName] = { page: `/${pageName}` };
      }
    });

    // Generate sitemap
    const xmlSitemap = generateSitemapXMLFromExportPathMap(exportPathMap);
    saveSitemap(xmlSitemap);

    return exportPathMap;
  },
};

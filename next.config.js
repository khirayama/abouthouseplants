const path = require('path');

const glob = require('glob');

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
    return exportPathMap;
  },
};

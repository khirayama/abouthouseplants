const fs = require('fs');
const path = require('path');

const glob = require('glob');

module.exports = {
  exportPathMap: async (defaultPathMap) => {
    const exportPathMap = {};

    const resourceTypes = [];
    const resourceRootPath = path.join(process.cwd(), 'resources');
    const resourcePaths = glob
      .sync(`${resourceRootPath}/**/*.md`)
      .map((p) => p.replace(resourceRootPath, '').replace('.md', ''));
    resourcePaths.forEach((resourcePath) => {
      const resourceType = resourcePath.split('/')[1];
      resourceTypes.push(resourceType);

      const resourceId = resourcePath.split('/')[2];
      exportPathMap[resourcePath] = { page: `/${resourceType}/[id]`, query: { id: resourceId } };
    });

    return exportPathMap;
  },
  // TODO
  experimental: {
    amp: {
      skipValidation: true,
    },
  },
};

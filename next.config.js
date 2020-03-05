module.exports = {
  webpack: config => {
    return Object.assign({}, config, {
      node: {
        fs: 'empty',
      },
    });
  },
  exportPathMap: async (defaultPathMap, { dev, dir, outDir, distDir, buildId }) => {
    return {
      '/': { page: '/' },
      '/new': { page: '/new' },
      '/notes/introduction': { page: '/notes/[id]', query: { id: 'introduction' } },
      '/labels/place': { page: '/labels/[id]', query: { id: 'place' } },
      '/labels/watering': { page: '/labels/[id]', query: { id: 'watering' } },
    };
  },
};

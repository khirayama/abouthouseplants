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
      '/posts/hello-nextjs': { page: '/posts/[key]', query: { key: 'hello-nextjs' } },
      '/posts/learn-nextjs': { page: '/posts/[key]', query: { key: 'learn-nextjs' } },
      '/posts/deploy-nextjs': { page: '/posts/[key]', query: { key: 'deploy-nextjs' } },
    };
  },
};

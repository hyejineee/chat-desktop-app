/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }

    config.resolve = {
      alias: {
        '@repositories': path.resolve(__dirname, 'src/commons/repositories'),
        '@dataSources': path.resolve(__dirname, 'src/commons/dataSources'),
        '@constants': path.resolve(__dirname, 'src/commons/constants'),
        '@contexts': path.resolve(__dirname, 'src/commons/contexts'),
        '@type': path.resolve(__dirname, 'src/commons/type'),
        '@utils': path.resolve(__dirname, 'src/commons/utils'),
      },
      ...config.resolve,
    };

    return config;
  },
};

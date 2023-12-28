
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};
module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.alias['fs'] = require.resolve('./mock-fs.js');
      }
      return config;
    },
  };
  
const withSvgr = require("next-plugin-svgr");

module.exports = withSvgr(nextConfig);

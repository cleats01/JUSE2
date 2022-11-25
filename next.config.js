/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
      issuer: /\.[jt]sx?$/,
      resolve: {
        alias: {
          '@mui/styled-engine': '@mui/styled-engine-sc',
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;

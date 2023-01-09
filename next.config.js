/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    sizes: '50px',
    domains: ['juse-user-image.s3.ap-northeast-2.amazonaws.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
      issuer: /\.[jt]sx?$/,
    });
    return config;
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;

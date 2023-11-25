// //  @type {import('next').NextConfig} /
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
// }

// module.exports = nextConfig
// module.exports = {
//   images: {
//       unoptimized: true
//   }
// }

// next.config.js

const webpack = require('webpack');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /@next\/next\/no-img-element/,
      })
    );

    return config;
  },
};

module.exports = nextConfig;

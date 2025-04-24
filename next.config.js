/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Generate a build ID to allow `next start` to locate the production build
  generateBuildId: async () => {
    // return timestamp-based ID
    return 'build-' + Date.now();
  },
};

module.exports = withPWA(nextConfig);

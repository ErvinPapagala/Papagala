/** @type {import('next').NextConfig} */
import images from './next.config.images.mjs';

const nextConfig = {
  reactStrictMode: true,
  ...images,
};

export default nextConfig;


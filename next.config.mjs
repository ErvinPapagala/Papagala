/** @type {import('next').NextConfig} */
import images from './next.config.images.mjs';

const nextConfig = {
  reactStrictMode: true,
  ...images,
  // Disable CSS optimization to fix build issues
  experimental: {
    optimizeCss: false,
  },
  // Alternative approach - configure webpack to handle CSS differently
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Disable CSS minification that's causing issues
      config.optimization.minimizer = config.optimization.minimizer.filter(
        (plugin) => plugin.constructor.name !== 'CssMinimizerPlugin'
      );
    }
    return config;
  },
};

export default nextConfig;


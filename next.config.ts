import type { NextConfig } from 'next';

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/year',
        destination: `/year/${new Date().getFullYear()}`,
        permanent: false,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);

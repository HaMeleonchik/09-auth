import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['ac.goit.global'], 
    remotePatterns: [{
      hostname: 'ac.goit.global',
    }
    ],
  },
};

export default nextConfig;

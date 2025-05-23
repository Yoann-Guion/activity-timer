import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/fr",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

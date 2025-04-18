import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/auth",
        destination: "/auth/login",
        permanent: true
      },
      {
        source: "/products",
        destination: "/search",
        permanent: true
      },
    ]
  }
};

export default nextConfig;

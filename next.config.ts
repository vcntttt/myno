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
      {
      source: "/register",
      destination: "/auth/register",
      permanent: true
      },
      {
      source: "/login",
      destination: "/auth/login",
      permanent: true
      },
    ]
  }
};

export default nextConfig;

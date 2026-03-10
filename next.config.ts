import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eldeco-group.onrender.com",
        pathname: "/api/v1/website/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3007",
        pathname: "/uploads/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
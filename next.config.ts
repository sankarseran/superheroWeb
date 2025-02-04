import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  useFileSystemPublicRoutes: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

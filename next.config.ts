import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // {
      //   protocol: "https",
      //   hostname: "cdn.dummyjson.com",
      // },
    ],
  } /* config options here */,
};

export default nextConfig;

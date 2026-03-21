import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // basePath removed — custom domain anishbabbar.me serves from /
  images: { unoptimized: true },
};

export default nextConfig;

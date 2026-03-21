import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/new_portfolio",
  images: { unoptimized: true },
};

export default nextConfig;

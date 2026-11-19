import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/technology", destination: "/businesses/technology", permanent: true }];
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.iea.org",
      },
      {
        protocol: "https",
        hostname: "www.cleanenergywire.org",
      },
      {
        protocol: "https",
        hostname: "news.un.org",
      },
    ],
  },
};

export default withNextIntl(nextConfig);

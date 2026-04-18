import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:locale/problemes",
        destination: "/:locale/problemes-solutions",
        permanent: true,
      },
      {
        source: "/:locale/solutions",
        destination: "/:locale/problemes-solutions",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

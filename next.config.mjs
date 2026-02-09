import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "biuro-rachunkowe-ksiegowa.vercel.app",
      },
      {
        protocol: "https",
        hostname: "karpol.vercel.app",
      },
    ],
  },
};

export default withNextIntl(nextConfig);

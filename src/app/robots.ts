import type { MetadataRoute } from "next";

const HOST = "https://vektadev.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${HOST}/sitemap.xml`,
    host: HOST,
  };
}

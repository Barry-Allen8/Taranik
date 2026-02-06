import type { MetadataRoute } from "next";

const BASE_URL = "https://vektadev.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/contact",
    "/portfolio",
    "/privacy",
    "/terms",

    "/pl",
    "/pl/about",
    "/pl/contact",
    "/pl/portfolio",
    "/pl/privacy",
    "/pl/terms",

    "/services",
    "/services/mobile-apps",
    "/services/chatbots",
    "/services/websites",

    "/pl/services",
    "/pl/services/mobile-apps",
    "/pl/services/chatbots",
    "/pl/services/websites",
  ];

  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));
}

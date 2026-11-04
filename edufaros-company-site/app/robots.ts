import type { MetadataRoute } from "next";

const baseUrl = "https://edufaros-company-website.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/thank-you/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

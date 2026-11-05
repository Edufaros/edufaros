import type { MetadataRoute } from "next";

const baseUrl = "https://edufaros-company-website.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/who-we-help/",
    "/who-we-help/education-admissions-consultancies/",
    "/who-we-help/language-schools/",
    "/who-we-help/tutoring-test-prep/",
    "/who-we-help/vocational-professional-training/",
    "/who-we-help/online-academies/",
    "/approach/",
    "/growth-systems/",
    "/about/",
    "/discuss-growth/",
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/who-we-help/") ? 0.8 : 0.7,
  }));
}

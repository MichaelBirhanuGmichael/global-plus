import type { MetadataRoute } from "next";

const baseUrl = "https://globalplus.com.et";

const routes = [
  { path: "", priority: 1 },
  { path: "/businesses/agribusiness", priority: 0.8 },
  { path: "/businesses/manufacturing", priority: 0.8 },
  { path: "/businesses/construction", priority: 0.8 },
  { path: "/businesses/trading", priority: 0.8 },
  { path: "/businesses/minerals", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}

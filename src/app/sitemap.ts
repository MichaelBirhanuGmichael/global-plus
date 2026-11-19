import type { MetadataRoute } from "next";
import { patterns } from "@/data/tires";
import { posts } from "@/data/news";

const baseUrl = "https://globalplus.com.et";

const routes = [
  { path: "", priority: 1 },
  { path: "/news", priority: 0.7 },
  { path: "/products/technology", priority: 0.8 },
  { path: "/businesses/technology", priority: 0.8 },
  ...posts.map((p) => ({ path: `/news/${p.slug}`, priority: 0.6 })),
  { path: "/products", priority: 0.9 },
  { path: "/products/tires", priority: 0.9 },
  ...patterns.map((p) => ({ path: `/products/tires/${p.slug}`, priority: 0.6 })),
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

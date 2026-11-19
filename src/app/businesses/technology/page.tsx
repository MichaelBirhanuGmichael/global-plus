import type { Metadata } from "next";
import BusinessPage from "@/components/business-page";
import { getBusiness } from "@/data/businesses";

const biz = getBusiness("technology")!;

export const metadata: Metadata = {
  title: biz.title,
  description: biz.description,
  alternates: { canonical: "/businesses/technology" },
  openGraph: { title: biz.title, description: biz.description, url: "/businesses/technology", images: [biz.hero.image] },
  twitter: { card: "summary_large_image", title: biz.title, description: biz.description, images: [biz.hero.image] },
};

export default function Page() {
  return <BusinessPage biz={biz} />;
}

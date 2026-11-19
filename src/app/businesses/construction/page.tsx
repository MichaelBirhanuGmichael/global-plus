import type { Metadata } from "next";
import BusinessPage from "@/components/business-page";
import { getBusiness } from "@/data/businesses";

const biz = getBusiness("construction")!;

export const metadata: Metadata = {
  title: biz.title,
  description: biz.description,
  alternates: { canonical: "/businesses/construction" },
  openGraph: { title: biz.title, description: biz.description, url: "/businesses/construction", images: [biz.hero.image] },
  twitter: { card: "summary_large_image", title: biz.title, description: biz.description, images: [biz.hero.image] },
};

export default function Page() {
  return <BusinessPage biz={biz} />;
}

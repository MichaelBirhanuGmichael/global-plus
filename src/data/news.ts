/* News posts. Add a record here to publish a new post; the list page and the post page are built from this file. */

export const SITE_URL = "https://globalplus.com.et";

export type NewsPost = {
  slug: string;
  /** Short label shown on the card and the post. */
  tag: string;
  title: string;
  /** ISO date, shown on the page. */
  date: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  position?: string;
  body: string[];
  gallery?: { src: string; alt: string; caption: string; position?: string }[];
  cta?: { label: string; href: string };
};

export const posts: NewsPost[] = [
  {
    slug: "exclusive-effiplus-tire-dealer-ethiopia",
    tag: "Partnership",
    title: "Global Plus appointed exclusive EFFIPLUS tire dealer in Ethiopia",
    date: "2026-11-19",
    excerpt:
      "Global Plus Business Group has signed an agreement making it the exclusive official dealer of EFFIPLUS truck and bus tires in Ethiopia, from 2027 to 2029.",
    image: "/news/effiplus-dealership-signing.jpg",
    imageAlt: "Global Plus and the Techking representative holding the signed dealership agreement at the Global Plus office",
    position: "50% 30%",
    body: [
      "Global Plus Business Group One Member PLC has signed a dealership agreement with Techking, the maker of EFFIPLUS tires. Under the agreement, Global Plus is the exclusive official dealer of EFFIPLUS brand tires in Ethiopia for the period 1 January 2027 to 31 December 2029.",
      "Global Plus can supply EFFIPLUS truck and bus radial (TBR) tires to its customers across Ethiopia. Every tire supplied is covered by EFFIPLUS's warranty policy.",
      "The range we offer has 30 patterns for three kinds of work: on-road tires for highway and long-haul trucks and buses, mix-road tires for routes that combine paved and unpaved surfaces, and off-road tires for quarries, mines and construction sites.",
      "Fleet operators, contractors, mines and distributors can browse the full range by pattern and size on our products page and request a quotation for the tires they need.",
    ],
    gallery: [
      {
        src: "/news/effiplus-visit-group.jpg",
        alt: "The Global Plus team and the Techking representatives standing together in the Global Plus office",
        caption: "The Global Plus team with the Techking representatives at the Global Plus office.",
      },
      {
        src: "/news/effiplus-ceo-logistics-head.jpg",
        alt: "The CEO and the logistics head of Global Plus standing together in front of the Global Plus sign",
        caption: "The CEO and the logistics head of Global Plus after the agreement was signed.",
        position: "50% 36%",
      },
      {
        src: "/news/effiplus-dealership-meeting.jpg",
        alt: "Global Plus staff meeting the Techking representative in the Global Plus office",
        caption: "A meeting between the Global Plus team and Techking.",
      },
      {
        src: "/news/effiplus-visit-working-session.jpg",
        alt: "A Techking representative going through the EFFIPLUS range on a laptop with the Global Plus team",
        caption: "A working session with the Techking team at the Global Plus office.",
      },
    ],
    cta: { label: "Browse the EFFIPLUS range", href: "/products/tires" },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

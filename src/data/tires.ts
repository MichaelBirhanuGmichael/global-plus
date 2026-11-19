/*
 * EFFIPLUS TBR (truck and bus radial) tires: the range Global Plus supplies in Ethiopia.
 * Source: EFFIPLUS TBR Tires Catalogue 2026 V1.0 (size and load tables). Copy a new row from the
 * catalogue when the range changes; nothing else on the site needs editing.
 *
 * TL = tubeless, TT = tube type. PR = ply rating. LI/SS = load index and speed symbol.
 * Load capacity is in kg per tire, single and dual fitment. Pressure is in bar.
 */

export type Road = "off" | "mix" | "on";
export type Construction = "TL" | "TT";

export type TireSize = {
  size: string;
  pr: string;
  tread: string;
  li: string;
  single: number;
  dual: number;
  bar: string;
  type: Construction;
};

export type TirePattern = {
  slug: string;
  name: string;
  road: Road;
  sizes: TireSize[];
  /** Product photo, a file in /public/products/tires/ (add it when the supplier's photo is available). */
  image?: string;
  /** Short selling points from the supplier's catalogue (optional; the page shows the section only when present). */
  features?: { title: string; text: string }[];
};

export const roads: Record<Road, { label: string; short: string; use: string }> = {
  off: {
    label: "Off road",
    short: "Quarries, mines and unpaved sites",
    use: "Built for quarries, mines, construction sites and unpaved routes where cuts and heavy loads are the main risk.",
  },
  mix: {
    label: "Mix road",
    short: "Paved and unpaved routes",
    use: "For fleets that run on both paved roads and rough or unpaved sections in the same trip.",
  },
  on: {
    label: "On road",
    short: "Highway and long haul",
    use: "For paved highway and long-haul operation, where mileage, fuel economy and stability matter most.",
  },
};

// [size, pr, tread depth mm, LI/SS, single kg, dual kg, bar, type]
type Row = [string, string, string, string, number, number, string, Construction];
const rows = (list: Row[]): TireSize[] =>
  list.map(([size, pr, tread, li, single, dual, bar, type]) => ({ size, pr, tread, li, single, dual, bar, type }));

export const patterns: TirePattern[] = [
  // ---------- Off road ----------
  { slug: "am4s-q699", name: "AM4S.Q699", road: "off", image: "/products/tires/am4s-q699.png", sizes: rows([["12.00R20", "22PR", "25.5", "158/155E", 4250, 3875, "9.7", "TT"]]) },
  { slug: "am4s-m688", name: "AM4S.M688", road: "off", image: "/products/tires/am4s-m688.png", sizes: rows([["12.00R24", "20PR", "23", "160/157K", 4500, 4125, "9", "TT"]]) },
  { slug: "am4s-q668x", name: "AM4S.Q668X", road: "off", image: "/products/tires/am4s-q668x.png", sizes: rows([["12.00R20", "22PR", "23.5", "162/158E", 4750, 4250, "9.3", "TT"]]) },
  {
    slug: "am4s-q689", name: "AM4S.Q689", road: "off", image: "/products/tires/am4s-q689.png",
    sizes: rows([
      ["12.00R24", "24PR", "32", "164/161B", 5000, 4625, "9", "TT"],
      ["13R22.5", "22PR", "24", "158/155K", 4250, 3875, "9.5", "TL"],
      ["315/80R22.5", "22PR", "26", "170/167F", 6000, 5450, "9.7", "TL"],
    ]),
  },
  {
    slug: "am4s-q659", name: "AM4S.Q659", road: "off",
    image: "/products/tires/am4s-q659.png",
    features: [
      { title: "High-strength carcass", text: "Improves structural integrity and safety for greater long-term value, with excellent retreadability." },
      { title: "Cut-resistant crown", text: "A reinforced crown and cut-resistant compound give stronger puncture resistance and better rough-road performance." },
      { title: "Reinforced bead", text: "The bead design raises load capacity for superior heavy-duty performance." },
    ],
    sizes: rows([["12.00R20", "22PR", "21", "162/158K", 4750, 4250, "9.3", "TT"]]),
  },
  {
    slug: "wolf-do", name: "WOLF DO", road: "off", image: "/products/tires/wolf-do.png",
    sizes: rows([
      ["10.00R20", "16PR", "21", "146/143K", 3000, 2725, "8.3", "TT"],
      ["11.00R20", "16PR", "21", "150/147K", 3350, 3075, "8.3", "TT"],
      ["12.00R20", "20PR", "21", "156/153K", 4000, 3650, "9", "TT"],
      ["12.00R20", "22PR", "21", "162/158K", 4750, 4250, "9.3", "TT"],
    ]),
  },

  // ---------- Mix road ----------
  {
    slug: "am4s-m618", name: "AM4S.M618", road: "mix", image: "/products/tires/am4s-m618.png",
    sizes: rows([
      ["12R22.5", "18PR", "21.5", "152/149K", 3550, 3250, "9.3", "TL"],
      ["13R22.5", "20PR", "21.5", "156/153K", 4000, 3650, "9.3", "TL"],
    ]),
  },
  {
    slug: "am4s-m628", name: "AM4S.M628", road: "mix", image: "/products/tires/am4s-m628.png",
    sizes: rows([
      ["11R22.5", "18PR", "21", "148/145K", 3150, 2900, "8.5", "TL"],
      ["12R22.5", "18PR", "21.5", "152/149K", 3550, 3250, "9.3", "TL"],
      ["13R22.5", "20PR", "21.5", "156/153K", 4000, 3650, "9.3", "TL"],
      ["315/80R22.5", "20PR", "21.5", "156/153K", 4000, 3650, "8.5", "TL"],
    ]),
  },
  { slug: "am4s-m636x", name: "AM4S.M636X", road: "mix", image: "/products/tires/am4s-m636x.png", sizes: rows([["12.00R20", "20PR", "19.5", "156/153K", 4000, 3650, "9.3", "TT"]]) },
  {
    slug: "am4s-m696x", name: "AM4S.M696X", road: "mix", image: "/products/tires/am4s-m696x.png",
    sizes: rows([
      ["12.00R20", "22PR", "20.5", "162/158K", 4750, 4250, "9.3", "TT"],
      ["13R22.5", "20PR", "21.5", "156/153K", 4000, 3650, "9.3", "TL"],
    ]),
  },
  { slug: "am4s-m698x", name: "AM4S.M698X", road: "mix", image: "/products/tires/am4s-m698x.png", sizes: rows([["7.50R16LT", "14PR", "14.5", "122/118L", 1500, 1320, "7.7", "TT"]]) },
  { slug: "am4s-m777", name: "AM4S.M777", road: "mix", image: "/products/tires/am4s-m777.png", sizes: rows([["13R22.5", "20PR", "22", "156/153K", 4000, 3650, "9.3", "TL"]]) },
  { slug: "moby-r261", name: "MOBY.R261", road: "mix", image: "/products/tires/moby-r261.png", sizes: rows([["385/65R22.5", "24PR", "16.5", "164K", 5000, 5000, "9.3", "TL"]]) },
  {
    slug: "moby-r802", name: "MOBY.R802", road: "mix", image: "/products/tires/moby-r802.png",
    sizes: rows([
      ["11.00R20", "18PR", "17", "152/149K", 3550, 3250, "9.3", "TT"],
      ["12.00R20", "18PR", "17.5", "154/151K", 3750, 3450, "8.3", "TT"],
      ["12.00R24", "20PR", "17.5", "160/157K", 4500, 4125, "9", "TT"],
      ["11R22.5", "18PR", "16.5", "148/145L", 3150, 2900, "8.5", "TL"],
      ["12R22.5", "18PR", "17", "152/149L", 3550, 3250, "9.3", "TL"],
      ["13R22.5", "20PR", "17.5", "156/153K", 4000, 3650, "9.3", "TL"],
      ["315/80R22.5", "20PR", "17.5", "156/153K", 4000, 3650, "8.5", "TL"],
    ]),
  },
  {
    slug: "moby-r802x", name: "MOBY.R802X", road: "mix", image: "/products/tires/moby-r802x.png",
    sizes: rows([
      ["10.00R20", "18PR", "16.5", "149/146K", 3250, 3000, "9.3", "TT"],
      ["12.00R20", "20PR", "17", "156/153K", 4000, 3650, "9", "TT"],
      ["315/80R22.5", "22PR", "17.5", "170/167K", 6000, 5450, "9.3", "TL"],
    ]),
  },
  { slug: "moby-r802xl", name: "MOBY.R802XL", road: "mix", image: "/products/tires/moby-r802xl.png", sizes: rows([["12.00R24", "20PR", "17.5", "160/157K", 4500, 4125, "9", "TT"]]) },
  { slug: "moby-r803x", name: "MOBY.R803X", road: "mix", image: "/products/tires/moby-r803x.png", sizes: rows([["325/95R24", "22PR", "16.5", "167/164K", 5450, 5000, "9", "TL"]]) },
  { slug: "moby-r842", name: "MOBY.R842", road: "mix", image: "/products/tires/moby-r842.png", sizes: rows([["12.00R20", "22PR", "17", "158/155K", 4250, 3875, "9", "TT"]]) },
  {
    slug: "moby-r842e", name: "MOBY.R842E", road: "mix", image: "/products/tires/moby-r842e.png",
    sizes: rows([
      ["11R22.5", "18PR", "15", "148/145L", 3150, 2900, "8.5", "TL"],
      ["315/80R22.5", "20PR", "15", "156/150M", 4000, 3350, "8.5", "TL"],
    ]),
  },
  {
    slug: "moby-r842x", name: "MOBY.R842X", road: "mix", image: "/products/tires/moby-r842x.png",
    sizes: rows([
      ["7.50R16LT", "14PR", "13.5", "122/118L", 1500, 1320, "7.7", "TT"],
      ["8.25R16LT", "16PR", "13.5", "128/124L", 1800, 1600, "7.7", "TT"],
      ["315/80R22.5", "22PR", "17.5", "164/160L", 5000, 4500, "9.3", "TL"],
    ]),
  },
  { slug: "moby-r877", name: "MOBY.R877", road: "mix", image: "/products/tires/moby-r877.png", sizes: rows([["13R22.5", "18PR", "17.5", "154/151L", 3750, 3450, "8.3", "TL"]]) },
  {
    slug: "tiger-am", name: "TIGER AM", road: "mix", image: "/products/tires/tiger-am.png",
    sizes: rows([
      ["10.00R20", "16PR", "16", "146/143K", 3000, 2725, "8.3", "TT"],
      ["10.00R20", "18PR", "16", "149/146K", 3250, 3000, "9.3", "TT"],
      ["11.00R20", "16PR", "16", "150/147K", 3350, 3075, "8.3", "TT"],
      ["11.00R20", "18PR", "16", "152/149K", 3550, 3250, "9.3", "TT"],
    ]),
  },
  { slug: "tiger-dm", name: "TIGER DM", road: "mix", image: "/products/tires/tiger-dm.png", sizes: rows([["7.50R16LT", "14PR", "16.5", "122/118J", 1500, 1320, "7.7", "TT"]]) },

  // ---------- On road ----------
  {
    slug: "folo-r109", name: "FOLO.R109", road: "on", image: "/products/tires/folo-r109.png",
    sizes: rows([
      ["7.50R16LT", "14PR", "13.5", "122/118L", 1500, 1320, "7.7", "TT"],
      ["7.00R16LT", "14PR", "11.5", "118/114L", 1320, 1180, "7.7", "TT"],
    ]),
  },
  {
    slug: "am4s-r608", name: "AM4S.R608", road: "on", image: "/products/tires/am4s-r608.png",
    sizes: rows([
      ["295/80R22.5", "18PR", "21.5", "152/149L", 3550, 3250, "9", "TL"],
      ["315/80R22.5", "20PR", "21.5", "156/153K", 4000, 3650, "8.5", "TL"],
    ]),
  },
  { slug: "am4s-r708", name: "AM4S.R708", road: "on", image: "/products/tires/am4s-r708.png", sizes: rows([["315/80R22.5", "20PR", "21.5", "156/153K", 4000, 3650, "8.5", "TL"]]) },
  { slug: "am4s-h606", name: "AM4S.H606", road: "on", image: "/products/tires/am4s-h606.png", sizes: rows([["315/80R22.5", "22PR", "21", "158/156L", 4250, 4000, "9", "TL"]]) },
  {
    slug: "folo-r129", name: "FOLO.R129", road: "on", image: "/products/tires/folo-r129.png",
    sizes: rows([
      ["11R22.5", "16PR", "17", "148/145M", 3150, 2900, "8.5", "TL"],
      ["295/80R22.5", "18PR", "16", "152/148M", 3550, 3150, "9", "TL"],
      ["315/80R22.5", "20PR", "17", "156/151K", 4000, 3450, "9", "TL"],
    ]),
  },
  {
    slug: "folo-r199-plus", name: "FOLO.R199+", road: "on", image: "/products/tires/folo-r199-plus.png",
    sizes: rows([
      ["11R22.5", "18PR", "17.5", "148/145M", 3150, 2900, "8.5", "TL"],
      ["12R22.5", "18PR", "17.5", "152/149M", 3550, 3250, "9.3", "TL"],
      ["295/80R22.5", "18PR", "17.5", "152/149M", 3550, 3250, "9", "TL"],
      ["315/80R22.5", "20PR", "17.5", "156/153K", 4000, 3650, "8.5", "TL"],
    ]),
  },
  {
    slug: "folo-r107", name: "FOLO.R107", road: "on", image: "/products/tires/folo-r107.png",
    sizes: rows([
      ["315/80R22.5", "22PR", "15.5", "158/156L", 4250, 4000, "9", "TL"],
      ["385/65R22.5", "24PR", "16.5", "164K", 5000, 5000, "9.3", "TL"],
      ["235/75R17.5", "18PR", "15", "143/141L", 2725, 2575, "8.75", "TL"],
      ["215/75R17.5", "18PR", "15", "135/133L", 2180, 2060, "8.5", "TL"],
    ]),
  },
];

export const getPattern = (slug: string) => patterns.find((p) => p.slug === slug);

export const sizeList = (p: TirePattern) => Array.from(new Set(p.sizes.map((s) => s.size)));

export const DEALER_LINE = "Exclusive official dealer of EFFIPLUS TBR tires in Ethiopia";

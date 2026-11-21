/*
 * The five business divisions. Each page is built from one of these records (see components/business-page.tsx),
 * so wording and photos are edited here and nothing else needs touching.
 */

import { ourWork, services, technology } from "@/data/technology";

export type Business = {
  slug: string;
  n: string;
  name: string;
  /** Value of the "Interested division" field on the contact form. */
  division: string;
  title: string;
  description: string;
  hero: { image: string; alt: string; headline: string; chips: string[]; quality?: number };
  intro?: { eyebrow: string; heading: string; text: string };
  capabilitiesHeading: string;
  /** [title, text, optional link]. Without a link the card opens the contact form for this division. */
  capabilities: [string, string, string?][];
  process: { eyebrow: string; heading: string; text: string; steps: string[]; image: string; alt: string; caption: string; video?: string };
  feature: { eyebrow: string; heading: string; text: string; items: string[]; image: string; alt: string };
  products?: boolean;
  /** Optional "build with us" section: services we sell, plus work we have built. */
  build?: { eyebrow: string; heading: string; text: string };
  cta: { heading: string; text: string };
};

export const businesses: Business[] = [
  {
    slug: "manufacturing",
    n: "01",
    name: "Manufacturing & Industrial",
    division: "Manufacturing & Industrial",
    title: "Manufacturing & Industrial | Global Plus Business Group",
    description: "Manufacturing capability spanning metal products, electrical equipment, domestic appliances, cement, lime, plaster and industrial inputs.",
    hero: {
      image: "/ethiopia-manufacturing-welding.jpg",
      alt: "Industrial metalworking and manufacturing operations in Ethiopia",
      headline: "Built to make. Engineered to grow.",
      chips: ["Industrial discipline", "Local capability", "Regional ambition"],
    },
    intro: {
      eyebrow: "Productive capacity",
      heading: "Turning resources into essential products.",
      text: "Global Plus is developing a connected manufacturing platform that combines material knowledge, production discipline and market access, creating dependable products for homes, businesses and infrastructure.",
    },
    capabilitiesHeading: "A diversified industrial portfolio.",
    capabilities: [
      ["Iron, steel & metal products", "Manufacturing and fabrication capability for iron, steel and other metallic mineral products."],
      ["Electrical appliances", "Production pathways for domestic electrical appliances designed around dependable local and regional demand."],
      ["Electrical machinery", "Electrical machinery, apparatus and utility products supported by disciplined industrial systems."],
      ["Cement, lime & plaster", "Planned manufacturing capacity for core construction materials serving infrastructure and building markets."],
      ["Cleaning & cosmetic inputs", "Manufacturing of cleaning and cosmetic products and their essential production inputs."],
      ["Industrial chemicals", "Integrated access to basic chemicals and chemical products used across industrial value chains."],
    ],
    process: {
      eyebrow: "Industrial platform",
      heading: "Strength across the value chain.",
      text: "From raw-material sourcing and fabrication to quality assurance and distribution, every stage is designed to work as one system. Shared expertise across the group creates stronger procurement, faster execution and scalable routes to market.",
      steps: ["Source inputs", "Engineer production", "Control quality", "Package & distribute"],
      image: "/ethiopia-manufacturing-hawassa.jpg",
      alt: "Ethiopian technicians working at an industrial production facility",
      caption: "People · Process · Production",
    },
    feature: {
      eyebrow: "Made through expertise",
      heading: "People power production.",
      text: "Modern equipment matters, but capable teams create consistent results. Our industrial direction prioritizes technical skills, safe operations, repeatable quality and continuous improvement.",
      items: ["Workforce development", "Quality control", "Operational safety", "Process improvement"],
      image: "/ethiopia-manufacturing-workers.jpg",
      alt: "Ethiopian manufacturing professionals on a production floor",
    },
    cta: { heading: "Make more possible. Build with Global Plus.", text: "Talk to our team about manufacturing partnerships, supply requirements and future industrial projects." },
  },
  {
    slug: "trading",
    n: "02",
    name: "Trading & Distribution",
    division: "Trading & Distribution",
    title: "Trading & Distribution | Global Plus Business Group",
    description: "Import, distribution and trade representation across ICT, electrical goods, tires, stationery, chemicals, plastics, batteries and consumer inputs.",
    hero: {
      image: "/ethiopia-trade-modjo.jpg",
      alt: "Container logistics at Ethiopia's Modjo Dry Port",
      headline: "Connected supply. Confident markets.",
      chips: ["Strategic sourcing", "Reliable movement", "Market access"],
    },
    capabilitiesHeading: "Products that keep business moving.",
    capabilities: [
      ["ICT & communication", "Computers, communication equipment and related technology products for connected organizations."],
      ["Electrical equipment", "Electrical machinery, apparatus, utilities and equipment sourced for commercial and industrial demand."],
      ["Stationery & paper", "Stationery materials, paper and paper products for institutions, businesses and distribution partners."],
      ["Industrial chemicals", "Basic chemicals and chemical products supporting manufacturing and other productive sectors."],
      ["Rubber, plastics & batteries", "Import and trade of rubber products, plastics, plastic products and batteries."],
      ["Cleaning & cosmetics", "Cleaning products, cosmetics and related inputs supplied through dependable market channels."],
    ],
    process: {
      eyebrow: "Integrated trade model",
      heading: "One network. Many markets.",
      text: "We coordinate the path from supplier selection to final delivery, aligning products, documentation, logistics and local market knowledge in one accountable system.",
      steps: ["Source", "Import", "Distribute", "Represent"],
      image: "/ethiopia-trade-port.jpg",
      alt: "Container movement at an Ethiopian inland logistics hub",
      caption: "Origin · Port · Market",
    },
    feature: {
      eyebrow: "Distribution intelligence",
      heading: "From shipment to shelf.",
      text: "Successful trade depends on more than transportation. It requires demand insight, dependable relationships and clear coordination at every handoff.",
      items: ["Supplier identification", "Import coordination", "Documentation support", "Warehousing pathways", "Channel distribution", "Domestic trade agency"],
      image: "/ethiopia-trade-logistics.jpg",
      alt: "Freight and container distribution operations in Ethiopia",
    },
    products: true,
    cta: { heading: "Connect products with opportunity.", text: "Tell us what you need to source, import or distribute. Our team will help define the right route to market." },
  },
  {
    slug: "construction",
    n: "03",
    name: "Construction & Infrastructure",
    division: "Construction & Infrastructure",
    title: "Construction & Infrastructure | Global Plus Business Group",
    description: "Building, road and waterworks contracting supported by general construction, engineering coordination and project delivery.",
    hero: {
      image: "/ethiopia-construction-addis.jpg",
      alt: "Ethiopian construction professionals working on a major Addis Ababa project",
      headline: "Building progress. Delivering confidence.",
      chips: ["Engineering focus", "Site discipline", "Lasting value"],
    },
    capabilitiesHeading: "Infrastructure built around purpose.",
    capabilities: [
      ["Building works", "Commercial, institutional and general building works delivered through coordinated construction teams."],
      ["Road works", "Road construction and associated civil works supporting safer movement and stronger connectivity."],
      ["Waterworks", "Water infrastructure contracting for systems that improve access, resilience and community value."],
      ["General contracting", "Multi-discipline contracting services beyond waterworks, aligned to defined project requirements."],
      ["Project coordination", "Planning, procurement, engineering coordination and on-site execution managed as one delivery path."],
      ["Fleet & site operations", "Equipment, logistics and active-site operations organized around safety, quality and progress."],
    ],
    process: {
      eyebrow: "Project delivery",
      heading: "One clear path from plan to handover.",
      text: "Each project moves through a controlled sequence that aligns people, materials, equipment and decisions, helping teams manage quality, safety, schedule and scope.",
      steps: ["Plan & mobilize", "Engineer & procure", "Build & control", "Complete & hand over"],
      image: "/ethiopia-construction-rail.jpg",
      alt: "Ethiopian infrastructure crew working on a concrete foundation",
      caption: "Plan · Build · Deliver",
    },
    feature: {
      eyebrow: "Essential infrastructure",
      heading: "Water systems that strengthen communities.",
      text: "Waterworks require technical care and local understanding. Our contracting direction connects civil execution with responsible planning and dependable project coordination.",
      items: ["Waterworks contracting", "Civil construction", "Site coordination", "Quality monitoring", "Resource planning", "Project handover"],
      image: "/ethiopia-construction-water.jpg",
      alt: "Water infrastructure construction supporting an Ethiopian community",
    },
    cta: { heading: "Build what matters. Build with Global Plus.", text: "Share the project type, location, scope and delivery requirements. Our team will help define the next steps." },
  },
  {
    slug: "agribusiness",
    n: "04",
    name: "Export & Agribusiness",
    division: "Export & Agribusiness",
    title: "Export & Agribusiness | Global Plus Business Group",
    description: "Ethiopian coffee, tea, oilseeds, pulses, cereals, spices, produce and flowers prepared for international markets by Global Plus Business Group.",
    hero: {
      image: "/global-plus-coffee-farm-hero.png",
      alt: "Ripe coffee cherries growing on a highland coffee farm",
      headline: "From Ethiopian origin to the world.",
      chips: ["Responsible sourcing", "Quality preparation", "Global delivery"],
    },
    intro: {
      eyebrow: "Rooted in provenance",
      heading: "Turning agricultural potential into global value.",
      text: "Global Plus connects Ethiopian producers with international markets through an integrated system of sourcing, processing, quality control, certification and logistics.",
    },
    capabilitiesHeading: "Beyond coffee. A diversified supply.",
    capabilities: [
      ["Coffee & tea", "Origin-led sourcing, washing, grading, roasting, quality assurance and export preparation."],
      ["Oilseeds", "Export-oriented sourcing and handling of sesame and other Ethiopian oilseed products."],
      ["Pulses & cereals", "Commercial aggregation, quality control and international supply of agricultural staples."],
      ["Pepper & spices", "Careful sourcing, preparation and distribution of distinctive Ethiopian spice products."],
      ["Fruits & vegetables", "Fresh produce handling built around quality, timing and dependable market delivery."],
      ["Flowers & plant products", "Export support for cut flowers, plant products and high-value horticultural supply chains."],
    ],
    process: {
      eyebrow: "Flagship value chain",
      heading: "Coffee, fully connected.",
      text: "Our coffee capability follows the product from landscape and harvest through washing, drying, hulling, grading and export-ready preparation, protecting its identity at every stage.",
      steps: ["Farm partnerships", "Selective harvest", "Processing", "Grading & quality", "Certification", "Export logistics"],
      image: "/ethiopia-coffee-sidama.jpg",
      alt: "Coffee workers processing cherries in Sidama, Ethiopia",
      caption: "Field footage · Ethiopian coffee origin",
      video: "/global-plus-coffee-origin.mp4",
    },
    feature: {
      eyebrow: "Market readiness",
      heading: "Prepared for the next destination.",
      text: "Requirements are aligned to the product, destination and buyer specification, creating a clear path from Ethiopia to regional and international customers.",
      items: ["Quality inspection", "Product grading", "Export documentation", "Certification coordination", "Packaging preparation", "Commodity logistics"],
      image: "/agri-coffee-sorting.png",
      alt: "Hands sorting and drying coffee beans under sunlight in Ethiopia",
    },
    cta: { heading: "Source with confidence. Grow with Global Plus.", text: "Tell us the product, volume, destination and quality requirement. Our team will help shape the right sourcing and export pathway." },
  },
  {
    slug: "minerals",
    n: "05",
    name: "Minerals & Resources",
    division: "Minerals & Resources",
    title: "Minerals & Resources | Global Plus Business Group",
    description: "Responsible sourcing, certification and export of precious, semi-precious, metallic and industrial minerals from Ethiopia.",
    hero: {
      image: "/minerals-hero.webp",
      alt: "Premium copper and malachite mineral specimen",
      headline: "Grounded in value. Connected to markets.",
      chips: ["Responsible sourcing", "Verified quality", "Export readiness"],
      quality: 82,
    },
    intro: {
      eyebrow: "Ethiopian resource potential",
      heading: "From geological opportunity to global value.",
      text: "Global Plus brings sourcing, market knowledge, certification coordination and export logistics together to develop responsible pathways for Ethiopia's mineral resources.",
    },
    capabilitiesHeading: "Diverse resources. Focused execution.",
    capabilities: [
      ["Precious minerals", "Commercial pathways for responsibly sourced precious mineral opportunities and export-ready supply."],
      ["Semi-precious minerals", "Identification, quality preparation and trade support for Ethiopia's distinctive semi-precious resources."],
      ["Metallic minerals", "Sourcing and export coordination for metallic mineral products aligned to buyer requirements."],
      ["Industrial minerals", "Market development for industrial mineral resources serving manufacturing and construction value chains."],
      ["Certification support", "Certificate-of-competence and documentation pathways coordinated for compliant mineral export activity."],
      ["Export logistics", "Quality, packaging, documentation and movement planned from source to international destination."],
    ],
    process: {
      eyebrow: "Resource pathway",
      heading: "Clarity at every stage.",
      text: "Mineral trade depends on verified material, reliable documentation and disciplined coordination. Our approach connects each stage into a transparent commercial pathway.",
      steps: ["Identify source", "Verify material", "Prepare & certify", "Coordinate export"],
      image: "/minerals-open-pit.webp",
      alt: "Large-scale open-pit mineral mine in Ethiopia",
      caption: "Source · Verify · Move",
    },
    feature: {
      eyebrow: "Responsible development",
      heading: "Value beyond the material.",
      text: "Long-term resource development requires care for people, place and commercial integrity. We prioritize traceable sourcing, appropriate documentation and partnerships designed to create durable value.",
      items: ["Traceable sourcing", "Material verification", "Regulatory alignment", "Documentation control", "Commercial transparency", "Responsible partnerships"],
      image: "/minerals-highland.webp",
      alt: "Ethiopian highland mineral-bearing rocky terrain",
    },
    cta: { heading: "Unlock potential. Partner responsibly.", text: "Tell us the mineral, required specification, volume and destination. Our team will help define a responsible commercial pathway." },
  },
  {
    slug: "technology",
    n: "06",
    name: "Technology",
    division: "Technology",
    title: "Technology | Global Plus Business Group",
    description: "Fleet management, GPS trackers and dash cams, and ERP and business systems for transport and business in Ethiopia.",
    hero: {
      image: "/products/tires/hero-on.jpg",
      alt: "A truck driving on a highway at sunset",
      headline: "Technology that moves business.",
      chips: ["Fleet intelligence", "GPS devices", "Business systems"],
    },
    intro: {
      eyebrow: "Group Technology",
      heading: "Software and devices for transport and business.",
      text: "Global Plus builds technology for the way Ethiopian businesses move goods and run their operations, from the vehicle on the road to the office that manages it.",
    },
    capabilitiesHeading: "Three technology lines.",
    capabilities: technology.map((t) => [t.title, t.text, `/products/technology#${t.slug}`] as [string, string, string]),
    process: {
      eyebrow: "How it fits together",
      heading: "From the vehicle to the office.",
      text: "The devices, the platform and the business systems are designed to work together, so each product makes the others more useful.",
      steps: ["Capture", "Manage", "Connect", "Improve"],
      image: "/stock-trading-logistics.jpg",
      alt: "Container vehicles moving through a port yard",
      caption: "Vehicle · Platform · Business",
    },
    feature: {
      eyebrow: "Why Global Plus Technology",
      heading: "Built in Ethiopia, for Ethiopian business.",
      text: "Our own engineers build the platform, the devices and the business systems, so each part works with the others and support is close by in Addis Ababa.",
      items: ["Built by our own engineers", "Local support in Addis Ababa", "Designed around Ethiopian practice", "Devices and software that work together"],
      image: "/news/effiplus-visit-group.jpg",
      alt: "The Global Plus team in the Global Plus office",
    },
    build: { eyebrow: "Build with us", heading: "Custom web and mobile development.", text: "Beyond our own products, we build web and mobile software for other companies. Here is what we can build, and what we have built ourselves." },
    cta: { heading: "Talk to our technology team.", text: "Tell us about your fleet, your routes or your business, and which of our technology lines you are interested in." },
  },
];

export const techServices = services;
export const techWork = ourWork;

export const getBusiness = (slug: string) => businesses.find((b) => b.slug === slug);

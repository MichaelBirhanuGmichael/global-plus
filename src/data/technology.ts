/*
 * The technology lines. Edit the wording or the status here; the Technology page, the homepage teaser and the contact form all read this file.
 * Status: "In development", "Coming soon" or "Available".
 */

export type TechStatus = "In development" | "Coming soon" | "Available";

export type TechProduct = {
  slug: string;
  title: string;
  short: string;
  text: string;
  points: string[];
  status: TechStatus;
  /** Pre-fills the contact form ("I would like to know more about ..."). */
  interest: string;
  icon: "fleet" | "connect" | "ticket" | "gps" | "erp";
  /** true = kept in the file but not shown anywhere on the website. Remove the line (or set false) to show it again. */
  hidden?: boolean;
};

const allTechnology: TechProduct[] = [
  {
    slug: "fleet-management",
    title: "Fleet management platform",
    short: "See, manage and protect every vehicle.",
    text: "One platform for companies that run trucks, buses and vehicles: where each vehicle is, how it is driven, how much fuel it uses and when it needs service.",
    points: ["Live location and trip history", "Fuel, speed and driver reports", "Alerts and maintenance reminders"],
    status: "In development",
    interest: "the fleet management platform",
    icon: "fleet",
  },
  {
    slug: "truck-owners-and-businesses",
    title: "Connecting truck owners with business owners",
    short: "Cargo that needs moving, trucks that have space.",
    text: "A platform that links businesses with cargo to move to truck owners who have capacity, with clear trips, documents and payment settlement.",
    points: ["Post a load, get matched to a truck", "Trip tracking and documents in one place", "Clear settlement for both sides"],
    status: "In development",
    interest: "connecting truck owners with business owners",
    icon: "connect",
    hidden: true,
  },
  {
    slug: "digital-ticketing",
    title: "Digital ticketing",
    short: "Tickets and seats, online.",
    text: "Digital ticketing for bus and transport operators: customers book seats on their phone, and the operator sees bookings, payments and passenger lists as they happen.",
    points: ["Seat booking and payments", "Passenger lists and daily reports", "Less cash handling, fewer queues"],
    status: "In development",
    interest: "digital ticketing",
    icon: "ticket",
    hidden: true,
  },
  {
    slug: "gps-trackers-and-dash-cams",
    title: "GPS trackers and dash cams",
    short: "The devices that feed the platform.",
    text: "Vehicle trackers, fuel sensors, driver ID and dash cameras for trucks, buses, delivery vans and motorbikes, connected to our fleet platform.",
    points: ["Wired, plug-in and battery trackers", "Fuel level and driver identification", "Dash cams with driver-safety alerts"],
    status: "Coming soon",
    interest: "GPS trackers and dash cams",
    icon: "gps",
  },
  {
    slug: "erp-and-business-systems",
    title: "ERP and business systems",
    short: "Run the whole company in one system.",
    text: "Finance, HR and payroll, purchasing, inventory and customer management in one system, set up around the way Ethiopian companies work.",
    points: ["Accounting, payroll and tax in one place", "Purchasing, stock and approvals", "Reports leadership can trust"],
    status: "Available",
    interest: "ERP and business systems",
    icon: "erp",
  },
];

/** The lines shown on the website: everything except the ones marked hidden. */
export const technology: TechProduct[] = allTechnology.filter((t) => !t.hidden);

/* Software development services (custom work for customers), shown next to the product lines. */
export type TechService = {
  slug: string;
  title: string;
  text: string;
  points: string[];
  interest: string;
  icon: "web" | "mobile";
};

export const services: TechService[] = [
  {
    slug: "web-development",
    title: "Web development",
    text: "Company websites, product catalogues, customer and staff portals and web applications: fast, secure and easy for your team to update.",
    points: ["Company and product websites", "Customer and staff portals", "Integrations with the systems you already use"],
    interest: "web development",
    icon: "web",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile app development",
    text: "Android and iOS apps for your customers, drivers and staff, connected to a web platform so everything stays in step.",
    points: ["Android and iOS apps", "Booking, tracking and ordering apps", "Built to work on Ethiopian networks and phones"],
    interest: "mobile app development",
    icon: "mobile",
  },
];

/* Work we have built ourselves. */
export const ourWork: { title: string; text: string; tag: string }[] = [
  { title: "The Global Plus website", text: "Products, news, careers and a contact form, designed and built in-house.", tag: "Web" },
  { title: "Careers portal", text: "Job applications from the website go straight into our company system, with CVs kept private and consent recorded.", tag: "Integration" },
  { title: "Company ERP", text: "Finance, HR and payroll, purchasing and cash in one system, built around Ethiopian practice.", tag: "Business system" },
];

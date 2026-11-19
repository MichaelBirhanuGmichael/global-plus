import type { TechProduct } from "@/data/technology";

/* Simple line icons for the five technology lines. */
export function TechIcon({ name }: { name: TechProduct["icon"] | "web" | "mobile" }) {
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (name) {
    case "fleet":
      return (
        <svg {...common}>
          <path d="M12 21s-6-5.2-6-10a6 6 0 0 1 12 0c0 4.8-6 10-6 10Z" />
          <circle cx="12" cy="11" r="2.2" />
        </svg>
      );
    case "connect":
      return (
        <svg {...common}>
          <circle cx="6" cy="12" r="2.4" />
          <circle cx="18" cy="6" r="2.4" />
          <circle cx="18" cy="18" r="2.4" />
          <path d="M8.2 11 15.8 7M8.2 13l7.6 4" />
        </svg>
      );
    case "ticket":
      return (
        <svg {...common}>
          <path d="M4 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1a2 2 0 0 1 0-4v0a2 2 0 0 0 0-4V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v1Z" />
          <path d="M14 6v12" strokeDasharray="2 2.4" />
        </svg>
      );
    case "gps":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
          <circle cx="12" cy="12" r="7.5" />
        </svg>
      );
    case "web":
      return (
        <svg {...common}>
          <rect x="3" y="4.5" width="18" height="15" rx="2.2" />
          <path d="M3 9h18" />
          <circle cx="6.2" cy="6.8" r="0.5" fill="currentColor" />
          <circle cx="8.4" cy="6.8" r="0.5" fill="currentColor" />
          <path d="m10.5 13.2-2 1.8 2 1.8M14.5 13.2l2 1.8-2 1.8" />
        </svg>
      );
    case "mobile":
      return (
        <svg {...common}>
          <rect x="7" y="2.8" width="10" height="18.4" rx="2.4" />
          <path d="M10.6 5.6h2.8M11 18.4h2" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" />
          <path d="M13 16.5h7M16.5 13v7" />
        </svg>
      );
  }
}

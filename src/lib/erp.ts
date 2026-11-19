/*
 * The careers connection to the company ERP. Used ONLY on the server (pages and route handlers), never in the browser:
 * the ERP's address and key live in environment variables (.env.local, not committed):
 *   ERP_URL           where the ERP answers, e.g. http://127.0.0.1:8000
 *   ERP_SITE          the ERP site's name, e.g. global.localhost (sent as X-Frappe-Site-Name; not needed in production if the address is the site's own)
 *   ERP_CAREERS_KEY   the secret key the ERP expects (site_config gp_careers_key)
 * If the ERP is not reachable the jobs page simply shows no openings; the rest of the website is not affected.
 */

export type Opening = {
  slug: string;
  title: string;
  department: string;
  employment_type: string;
  location: string;
  posted_on: string;
  closes_on: string;
  pay: string;
  description?: string;
};

const BASE = "/api/method/globalplus_ops.careers.";

function erpHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "X-GP-Careers-Key": process.env.ERP_CAREERS_KEY ?? "" };
  if (process.env.ERP_SITE) headers["X-Frappe-Site-Name"] = process.env.ERP_SITE;
  return headers;
}

export function erpConfigured(): boolean {
  return Boolean(process.env.ERP_URL && process.env.ERP_CAREERS_KEY);
}

export async function erpFetch(method: string, init: RequestInit & { query?: Record<string, string> } = {}): Promise<Response> {
  const { query, ...rest } = init;
  const url = new URL(BASE + method, process.env.ERP_URL);
  for (const [k, v] of Object.entries(query ?? {})) url.searchParams.set(k, v);
  return fetch(url, { ...rest, headers: { ...erpHeaders(), ...(rest.headers ?? {}) }, cache: "no-store", signal: AbortSignal.timeout(10_000) });
}

export async function getOpenings(): Promise<Opening[]> {
  if (!erpConfigured()) return [];
  try {
    const res = await erpFetch("get_openings");
    if (!res.ok) return [];
    return ((await res.json()).message as Opening[]) ?? [];
  } catch {
    return [];
  }
}

export async function getOpening(slug: string): Promise<Opening | null> {
  if (!erpConfigured()) return null;
  try {
    const res = await erpFetch("get_opening", { query: { slug } });
    if (!res.ok) return null;
    return ((await res.json()).message as Opening) ?? null;
  } catch {
    return null;
  }
}

/** Frappe sends its error text inside _server_messages (a JSON list of JSON strings). */
export function erpMessage(body: unknown): string {
  try {
    const raw = (body as { _server_messages?: string })._server_messages;
    if (raw) {
      const first = JSON.parse(JSON.parse(raw)[0]) as { message?: string };
      if (first.message) return first.message.replace(/<[^>]+>/g, "");
    }
  } catch {
    /* fall through */
  }
  return "";
}

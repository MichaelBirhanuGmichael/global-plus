import { erpConfigured, erpFetch, erpMessage } from "@/lib/erp";

/*
 * Receives an application from the Apply form and passes it to the ERP with the secret key. The browser never talks to the ERP.
 * First line of protection here (the ERP checks again): a hidden field that only a bot fills in, a limit on how often one address can apply,
 * a size and type check on the CV. The ERP then stops repeats, checks the file really is what it says, and keeps the CV private.
 */

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED = [".pdf", ".doc", ".docx"];
const WINDOW_MS = 10 * 60 * 1000;
const MAX_TRIES = 5;
const tries = new Map<string, number[]>(); // per server process: enough for one site, reset when it restarts

function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (tries.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  tries.set(ip, recent);
  return recent.length > MAX_TRIES;
}

const fail = (message: string, status = 400) => Response.json({ ok: false, message }, { status });

export async function POST(request: Request) {
  if (!erpConfigured()) return fail("Applications are not open right now. Please try again later.", 503);
  const ip = (request.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (tooMany(ip)) return fail("Too many attempts. Please wait a few minutes and try again.", 429);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("The form could not be read. Please try again.");
  }
  if (String(form.get("website") ?? "")) return Response.json({ ok: true, status: "received" }); // the hidden field: a bot; say thanks and keep nothing

  const cv = form.get("cv");
  if (!(cv instanceof File) || cv.size === 0) return fail("Please attach your CV.");
  if (cv.size > MAX_CV_BYTES) return fail("Your CV is larger than 5 MB.");
  if (!ALLOWED.some((ext) => cv.name.toLowerCase().endsWith(ext))) return fail("Your CV must be a PDF or a Word file.");

  const out = new FormData();
  for (const key of ["slug", "full_name", "email", "phone", "cover_note", "notice_period", "expected_salary", "how_heard", "consent", "src", "campaign"]) {
    const value = form.get(key);
    if (typeof value === "string") out.set(key, value);
  }
  out.set("cv", cv, cv.name);

  try {
    const res = await erpFetch("apply", { method: "POST", body: out });
    const body = await res.json().catch(() => ({}));
    if (res.ok) {
      const status = (body as { message?: { status?: string } }).message?.status;
      return Response.json({ ok: true, status: status === "duplicate" ? "duplicate" : "received" });
    }
    return fail(erpMessage(body) || "Your application could not be sent. Please try again.", res.status >= 500 ? 502 : 400);
  } catch {
    return fail("We could not reach our systems. Please try again in a few minutes.", 502);
  }
}

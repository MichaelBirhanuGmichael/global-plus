"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type Props = { slug: string; title: string };
type Phase = "idle" | "sending" | "received" | "duplicate";

const MAX_CV_BYTES = 5 * 1024 * 1024; // the website's server and the ERP check the same limit again
const CV_TYPES = [".pdf", ".doc", ".docx"];
const HOW_HEARD = ["", "Telegram", "Facebook", "LinkedIn", "Ethiojobs", "Afriwork", "A friend or colleague", "Our website", "Other"];

/** Ethiopian mobile in the format the ERP keeps: +251 91 123 4567. Returns "" if it is not one. */
function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("251")) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);
  if (!/^[97]\d{8}$/.test(digits)) return "";
  return `+251 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
}

/** "25000" -> "25,000" as the person types. */
function withCommas(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 9);
  return digits ? Number(digits).toLocaleString("en-US") : "";
}

function sizeText(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function ApplyForm({ slug, title }: Props) {
  const params = useSearchParams(); // the channel and campaign of the link the person came by: ?src=telegram&c=...
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [salary, setSalary] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  function pickFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setError("");
    if (!file) return;
    if (!CV_TYPES.some((ext) => file.name.toLowerCase().endsWith(ext))) {
      setError("Your CV must be a PDF or a Word file.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_CV_BYTES) {
      setError(`That file is ${sizeText(file.size)}. Your CV must be 5 MB or smaller.`);
      event.target.value = "";
      return;
    }
    setCv(file);
  }

  function clearFile() {
    setCv(null);
    if (fileInput.current) fileInput.current.value = "";
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const phone = formatPhone(String(data.get("phone") ?? ""));
    if (!phone) {
      setError("Please enter a valid Ethiopian mobile number, for example 91 123 4567.");
      return;
    }
    if (!cv) {
      setError("Please attach your CV.");
      return;
    }
    if (!data.get("consent")) {
      setError("Please tick the box to agree before sending.");
      return;
    }
    data.set("phone", phone);
    data.set("expected_salary", salary.replace(/\D/g, ""));
    data.set("consent", "1");
    data.set("cv", cv, cv.name);
    data.set("slug", slug);
    data.set("src", params.get("src") ?? "");
    data.set("campaign", params.get("c") ?? "");

    setPhase("sending");
    try {
      const res = await fetch("/api/jobs/apply", { method: "POST", body: data });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; status?: string; message?: string };
      if (res.ok && body.ok) {
        setPhase(body.status === "duplicate" ? "duplicate" : "received");
        form.reset();
        return;
      }
      setError(body.message || "Your application could not be sent. Please try again.");
    } catch {
      setError("We could not reach our systems. Please check your connection and try again.");
    }
    setPhase("idle");
  }

  if (phase === "received" || phase === "duplicate") {
    return (
      <div className="applyDone" role="status">
        <p className="contactEyebrow">{phase === "received" ? "Application received" : "Already applied"}</p>
        <h2>{phase === "received" ? "Thank you." : "We already have your application."}</h2>
        <p>
          {phase === "received"
            ? `We have received your application for ${title}. If your profile matches the position, our HR team will contact you.`
            : `You have already applied for ${title}. Our HR team has your details and will be in touch if your profile matches.`}
        </p>
      </div>
    );
  }

  return (
    <form className="inquiryForm applyForm" onSubmit={submit} noValidate>
      <h2>Apply for this position</h2>
      <div className="formGrid">
        <label>
          Full name
          <input name="full_name" required placeholder="Your full name" autoComplete="name" maxLength={140} />
        </label>
        <label>
          Email address
          <input name="email" type="email" required placeholder="you@example.com" autoComplete="email" maxLength={140} />
        </label>
        <label className="phoneField">
          Mobile number
          <div className="phoneFieldRow">
            <span className="phoneCode" aria-hidden="true">
              +251
            </span>
            <input name="phone" type="tel" inputMode="tel" required placeholder="91 123 4567" autoComplete="tel-national" />
          </div>
        </label>
        <label>
          How soon could you start? <em className="optional">optional</em>
          <input name="notice_period" placeholder="For example, 30 days" maxLength={60} />
        </label>
        <label>
          Expected salary, ETB per month <em className="optional">optional</em>
          <input
            type="text"
            inputMode="numeric"
            placeholder="For example, 25,000"
            value={salary}
            onChange={(event) => setSalary(withCommas(event.target.value))}
            autoComplete="off"
          />
        </label>
        <label>
          How did you hear about this position? <em className="optional">optional</em>
          <select name="how_heard" defaultValue="">
            {HOW_HEARD.map((item) => (
              <option key={item || "none"} value={item}>
                {item || "Choose one"}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Short note <em className="optional">optional</em>
        <textarea name="cover_note" rows={4} maxLength={2000} placeholder="Tell us briefly why you are a good fit" />
      </label>

      <div className="fileField">
        <span className="fileTitle">Your CV</span>
        <input ref={fileInput} className="srOnly" type="file" accept=".pdf,.doc,.docx,application/pdf" onChange={pickFile} tabIndex={-1} aria-hidden="true" />
        <div className="fileRow">
          <button type="button" className="fileButton" onClick={() => fileInput.current?.click()}>
            {cv ? "Change file" : "Choose file"}
          </button>
          <span className={cv ? "fileName has" : "fileName"}>{cv ? `${cv.name} · ${sizeText(cv.size)}` : "PDF or Word, up to 5 MB"}</span>
          {cv ? (
            <button type="button" className="fileClear" onClick={clearFile}>
              Remove
            </button>
          ) : null}
        </div>
      </div>

      <label className="honey" aria-hidden="true">
        Leave this empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input type="checkbox" name="consent" />
        <span>I agree that Global Plus Business Group keeps my details and CV for hiring purposes.</span>
      </label>
      {error ? (
        <p className="applyError" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="sendButton" disabled={phase === "sending"}>
        {phase === "sending" ? "Sending…" : "Send application"} <span>↗</span>
      </button>
      <p>We use your details only to consider your application.</p>
    </form>
  );
}
